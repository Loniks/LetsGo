'use strict';

angular.module('loginApp')
    .controller('registerVisitor', function ($scope, $http, user, $window, Auth) {
        $scope.error = false;
        $scope.register = function register() {
            $http.post('api/visitors', {
                "name": $scope.name,
                "email": $scope.email,
                "password": $scope.password,
                "status" : "enable"
            })
            .then(function (successResult){
                alert("ok");

                var loginData = successResult.data;

                if (!angular.isUndefined(loginData)) {
                    Auth.login(loginData, function(user) {
                        //success function
                        $state.go('home');
                    }, function(err) {
                        console.log("error");
                        $scope.error = true;
                    });

                }else {
                    $scope.error = true;
                }

            },function (errorResult){
                $scope.error = true;
            });

        };
    });
