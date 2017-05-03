'use strict';

angular.module('letsgo')
    .controller('registerOwner', function ($scope, $http, Auth, $state) {
        $scope.error = false;
        $scope.register = function register() {
            $http.post('api/sponsors', {
                "name": $scope.name,
                "email": $scope.email,
                "password": $scope.password,
                "phone": $scope.phone,
                "contactPerson": $scope.person,
                "status" : "enable"
            })
            .then(function (successResult){

                var loginData = successResult.data;
                alert(!angular.isUndefined(loginData));

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
