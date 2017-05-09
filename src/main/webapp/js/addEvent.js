'use strict';

angular.module('letsgo')
    .controller('addEvent', function ($scope, $http, Auth, $state) {
        $scope.error = false;
        $scope.add = function add() {
            $http.post('api/events', {
                "name": $scope.name,
                "description": $scope.description,
                "address": $scope.address,
                "startDate": $scope.startDate,
                "duration": $scope.duration,
                "numberOfTickets": $scope.numberOfTickets,
                "numberOfFreePlaces": $scope.numberOfTickets,
                "status": "enable"
            }).then(function (successResult) {
                $state.go('manageEvents');
            }, function (errorResult) {
                $scope.error = true;
            });

        };
    });
