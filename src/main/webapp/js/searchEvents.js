'use strict';


angular.module('letsgo')
    .controller('searchEvent', function ($scope, $http) {
        $scope.events = null;
        $scope.eventName = "";

        findAllEvents();

        function findAllEvents() {
            $http.get('api/events')
                .then(function (data) {
                    $scope.events = data.data._embedded.eventEntities;
                });
        }

        $scope.findAllEventsByName = function findAllEventsByName() {

            $http.get('api/events/search/findByNameContaining?name='+$scope.eventName
            ).then(function (data) {
                    $scope.events = data.data._embedded.eventEntities;
                });
        }
    });
