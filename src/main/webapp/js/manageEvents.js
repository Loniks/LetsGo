'use strict';


angular.module('letsgo')
    .controller('manageEvents', function ($scope, $http, $rootScope) {
        $scope.events = null;
        findAllEvents();

        $scope.changeStatus = function changeStatus(event) {
            if (event.status == "enable") event.status = "disable";
            else event.status = "enable";
            $http.post('api/events', event).finally(function () {
                findAllEvents();
            });
        };

        $scope.deleteEvent = function deleteEvent(event) {
            $http.delete('api/events/'+event.id).finally(function () {
                findAllEvents();
            });
        };

        function findAllEvents() {

            $http.get('api/events/search/findAllByOwner_Id?id=' + $rootScope.credentials.id)
                .then(function (data) {
                    $scope.events = data.data._embedded.eventEntities;
                });
        }
    });
