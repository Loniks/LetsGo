'use strict';

angular.module('letsgo')
    .factory('Auth', ['$http', '$rootScope', '$window', 'Session', 'AUTH_EVENTS','$q','$state',
        function ($http, $rootScope, $window, Session, AUTH_EVENTS,$q,$state) {
            var authService = {};

            //the login function
            authService.login = function (user, success, error) {
                console.log(user);
                var promise1 = $http.get("api/admins/search/findOneByEmailAndPassword",
                    {
                        "params": {
                            "email": user.email,
                            "password": user.password
                        }
                    });
                var promise2 = $http.get("api/sponsors/search/findOneByEmailAndPassword",
                    {
                        "params": {
                            "email": user.email,
                            "password": user.password
                        }
                    });
                var promise3 = $http.get("api/visitors/search/findOneByEmailAndPassword",
                    {
                        "params": {
                            "email": user.email,
                            "password": user.password
                        }
                    });


                var resilientPromises = [];

                angular.forEach([
                    promise1,
                    promise2,
                    promise3
                ], function(p) {
                    var resilientP = p.catch( function(result) {
                        //return to convert rejection to success
                        return result;
                    });
                    resilientPromises.push(resilientP);
                });

                $q.all(resilientPromises).then(function(data)
                    {
                        if(data[0].status == 200) {
                            var loginData = data[0].data;
                            loginData.userRole = "admin";
                            if(loginData.status!= "enable"){
                                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                                error();
                            }

                            //delete password not to be seen clientside
                            delete loginData.password;

                            $window.sessionStorage["userInfo"] = JSON.stringify(loginData);

                            Session.create(loginData);

                            //fire event of successful login
                            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                            //run success function
                            success(loginData);
                        } else if(data[1].status == 200) {
                            var loginData = data[1].data;
                            loginData.userRole = "owner";
                            if(loginData.status!= "enable"){
                                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                                error();
                            }

                            //delete password not to be seen clientside
                            delete loginData.password;

                            $window.sessionStorage["userInfo"] = JSON.stringify(loginData);

                            Session.create(loginData);

                            //fire event of successful login
                            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                            //run success function
                            success(loginData);
                        } else if(data[2].status == 200) {
                            var loginData = data[2].data;
                            loginData.userRole = "visitor";

                            if(loginData.status!= "enable"){
                                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                                error();
                            }

                            //delete password not to be seen clientside
                            delete loginData.password;

                            $window.sessionStorage["userInfo"] = JSON.stringify(loginData);

                            Session.create(loginData);

                            //fire event of successful login
                            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                            //run success function
                            success(loginData);
                        } else {
                            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                            error();
                        }
                    },
                    function(errorData){
                        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                        error();
                    });
            };

            //check if the user is authenticated
            authService.isAuthenticated = function () {
                return !!Session.user;
            };

            //check if the user is authorized to access the next route
            //this function can be also used on element level
            //e.g. <p ng-if="isAuthorized(authorizedRoles)">show this only to admins</p>
            authService.isAuthorized = function (authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }
                return (authService.isAuthenticated() &&
                authorizedRoles.indexOf(Session.userRole) !== -1);
            };

            //log out the user and broadcast the logoutSuccess event
            authService.logout = function () {

                Session.destroy();
                $window.sessionStorage.removeItem("userInfo");
                $state.go('guest');
                //$rootScope.reload();
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);

            }

            return authService;

        }
    ]);
