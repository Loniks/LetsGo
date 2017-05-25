'use strict';

angular.module('letsgo')
    .controller('addEvent', function ($scope, $http, Auth, $state, $rootScope) {
        $scope.error = false;
        $scope.add = function add() {
            console.log("aa");
            console.log($rootScope.credentials);
            console.log({
                "name": $scope.name,
                "description": $scope.description,
                "address": $scope.address,
                "startDate": $scope.startDate,
                "duration": $scope.duration,
                "numberOfTickets": 0,
                "numberOfFreePlaces": $scope.numberOfTickets,
                "status": "enable",
                "owner": $rootScope.credentials
            });
            $http.post('api/events', {
                "name": $scope.name,
                "description": $scope.description,
                "address": $scope.address,
                "startDate": $scope.startDate,
                "duration": $scope.duration,
                "numberOfTickets": 0,
                "numberOfFreePlaces": $scope.numberOfTickets,
                "status": "enable",
                "owner": $rootScope.credentials._links.self.href
            }).then(function (successResult) {
                console.log(successResult);
                $state.go('manageEvents');
            }, function (errorResult) {
                $scope.error = true;
            });

        };
    });
