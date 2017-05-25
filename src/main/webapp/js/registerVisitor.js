'use strict';

angular.module('letsgo')
    .controller('registerVisitor', function ($scope, $http, Auth, $state) {
        $scope.error = false;
        $scope.register = function register() {
            $http.post('api/visitors', {
                "name": $scope.name,
                "email": $scope.email,
                "password": $scope.password,
                "phone": $scope.phone,
                "status" : "enable"
            })
            .then(function (successResult){

                var loginData = successResult.data;

                if (!angular.isUndefined(loginData)) {
                    Auth.login(loginData, function(user) {
                        $state.go('home');
                    }, function(err) {
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
