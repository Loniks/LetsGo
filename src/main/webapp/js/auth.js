'use strict';

angular.module('letsgo')
    .factory('Auth', ['$http', '$rootScope', '$window', 'Session', 'AUTH_EVENTS',
        function ($http, $rootScope, $window, Session, AUTH_EVENTS) {
            var authService = {};

            //the login function
            authService.login = function (user, success, error) {
                console.log(user);
                var result = new Array();
                $http.get("api/admins/search/findOneByEmailAndPassword",
                    {
                        "params": {
                            "email": user.email,
                            "password": user.password
                        }
                    }).then(function (successResult) {
                    var loginData = successResult.data;
                    loginData.userRole = "admin";

                    //delete password not to be seen clientside
                    delete loginData.password;

                    $window.sessionStorage["userInfo"] = JSON.stringify(loginData);

                    Session.create(loginData);
                    //$rootScope.currentUser = loginData;

                    //fire event of successful login
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    //run success function
                    result[0] = false;
                    success(loginData);
                }, function (errorResult) {
                    result[0] = true;
                }).then($http.get("api/sponsors/search/findOneByEmailAndPassword",
                    {
                        "params": {
                            "email": user.email,
                            "password": user.password
                        }
                    }).then(function (successResult) {

                    var loginData = successResult.data;

                    loginData.userRole = "owner";
                    //delete password not to be seen clientside
                    delete loginData.password;

                    $window.sessionStorage["userInfo"] = JSON.stringify(loginData);

                    Session.create(loginData);
                    //$rootScope.currentUser = loginData;

                    //fire event of successful login
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    //run success function
                    result[1] = false;
                    success(loginData);

                }, function (errorResult) {

                    result[1] = true;

                })).then(
                    $http.get("api/visitors/search/findOneByEmailAndPassword",
                        {
                            "params": {
                                "email": user.email,
                                "password": user.password
                            }
                        }).then(function (successResult) {
                        var loginData = successResult.data;

                        loginData.userRole = "visitor";
                        //delete password not to be seen clientside
                        delete loginData.password;

                        $window.sessionStorage["userInfo"] = JSON.stringify(loginData);

                        Session.create(loginData);
                        //$rootScope.currentUser = loginData;

                        //fire event of successful login
                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                        //run success function
                        result[2] = false;
                        success(loginData);
                    }, function (errorResult) {
                        result[2] = true;
                    }));
                /*$http.get("api/admins/search/findOneByEmailAndPassword",
                    {
                        "params": {
                            "email": user.email,
                            "password": user.password
                        }
                    }).then(function (successResult) {
                    console.log("ok owner");

                    var loginData = successResult.data;
                    loginData.userRole = "admin";

                    //delete password not to be seen clientside
                    delete loginData.password;

                    $window.sessionStorage["userInfo"] = JSON.stringify(loginData);

                    Session.create(loginData);
                    //$rootScope.currentUser = loginData;

                    //fire event of successful login
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    //run success function
                    result[0] = false;
                    success(loginData);

                }, function (errorResult) {
                    console.log(errorResult);
                    result[0] = true;
                });
                $http.get("api/sponsors/search/findOneByEmailAndPassword",
                    {
                        "params": {
                            "email": user.email,
                            "password": user.password
                        }
                    }).then(function (successResult) {
                    console.log("ok owner");

                    var loginData = successResult.data;

                    loginData.userRole = "owner";
                    //delete password not to be seen clientside
                    delete loginData.password;

                    $window.sessionStorage["userInfo"] = JSON.stringify(loginData);

                    Session.create(loginData);
                    //$rootScope.currentUser = loginData;

                    //fire event of successful login
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    //run success function
                    result[1] = false;
                    success(loginData);

                }, function (errorResult) {
                    console.log(errorResult);
                    result[1] = true;

                });
                $http.get("api/visitors/search/findOneByEmailAndPassword",
                    {
                        "params": {
                            "email": user.email,
                            "password": user.password
                        }
                    }).then(function (successResult) {
                    console.log("ok visitor");

                    var loginData = successResult.data;

                    loginData.userRole = "visitor";
                    //delete password not to be seen clientside
                    delete loginData.password;

                    $window.sessionStorage["userInfo"] = JSON.stringify(loginData);

                    Session.create(loginData);
                    //$rootScope.currentUser = loginData;

                    //fire event of successful login
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    //run success function
                    result[2] = false;
                    success(loginData);

                }, function (errorResult) {
                    console.log(errorResult);
                    result[2] = true;
                });*/
                if(result[0] || result[1] || result[2]){
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                    error();
                }
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
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);

            }

            return authService;

        }
    ]);
