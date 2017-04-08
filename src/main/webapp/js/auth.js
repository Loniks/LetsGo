'use strict';

var usersJson = {
    "users": {
        "admin": {
            "username": "supper@test.com",
            "password": "supper",
            "userRole": "admin"
        },
        "owner": {
            "username": "owner",
            "password": "owner",
            "userRole": "owner"
        },
        "visitor": {
            "username": "visitor",
            "password": "visitor",
            "userRole": "visitor"
        }
    }
};

angular.module('loginApp')
    .factory('Auth', ['$http', '$rootScope', '$window', 'Session', 'AUTH_EVENTS',
        function($http, $rootScope, $window, Session, AUTH_EVENTS) {
            var authService = {};

            //the login function
            authService.login = function(user, success, error) {
                //$http.post('users.json').success(function(data) {
                $http.get("api/admins/search/findOneByEmailAndPassword",
                    {
                        "params": {
                            "email": user.username,
                            "password": user.password
                        }
                    }).then(function (successResult){
                    alert("ok");

                    var loginData = successResult.data;

                    loginData.userRole = "admin";
                    $window.sessionStorage["userInfo"] = JSON.stringify(loginData);
                    //delete password not to be seen clientside
                    delete loginData.password;

                    $rootScope.currentUser = loginData;

                    //fire event of successful login
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    //run success function
                    success(loginData);

                },function (errorResult){
                    alert("bad");
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                    error();
                });
            };

            //check if the user is authenticated
            authService.isAuthenticated = function() {
                return !!Session.user;

            };

            //check if the user is authorized to access the next route
            //this function can be also used on element level
            //e.g. <p ng-if="isAuthorized(authorizedRoles)">show this only to admins</p>
            authService.isAuthorized = function(authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }
                return (authService.isAuthenticated() &&
                authorizedRoles.indexOf(Session.userRole) !== -1);
            };

            //log out the user and broadcast the logoutSuccess event
            authService.logout = function() {

                Session.destroy();
                $window.sessionStorage.removeItem("userInfo");
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);

            }

            return authService;

        }
    ]);