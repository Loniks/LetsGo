'use strict';

angular.module('letsgo')
    .controller('updateEvent', function ($scope, $http, Auth, $state, $stateParams) {
        $scope.error = false;

        init($stateParams.id);

        function init(id) {
            $http.get('api/events/'+id)
                .then(function (successResult) {
                $scope.event= successResult.data;
            }, function (errorResult) {
                $scope.error = true;
            });


        }

        $scope.update = function update() {
            $scope.event.owner = $scope.event._links.owner.href;
            $http.post('api/events', $scope.event).then(function (successResult) {
                $state.go('manageEvents');
            }, function (errorResult) {
                $scope.error = true;
            });
        };

        $scope.changeStatus = function changeStatus(event) {
            if (event.status == "enable") event.status = "disable";
            else event.status = "enable";
            $http.post('api/events', event).finally(function () {
                $state.go("manageEvents");
            });
        };

        $scope.deleteEvent = function deleteEvent(event) {
            $http.delete('api/events/'+event.id).finally(function () {
                $state.go("manageEvents");
            });
        };
    });
