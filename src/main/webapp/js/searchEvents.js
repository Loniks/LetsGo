'use strict';


angular.module('letsgo')
    .controller('searchEvent', function ($scope, $http, $q, $rootScope,$state) {
        $scope.events = null;
        $scope.eventName = "";

        findAllEvents();

        function findAllEvents() {
            $http.get('api/events/search/findByNumberOfTicketsIsLessThanNumberOfFreePlaces')
                .then(function (data) {
                    $scope.events = data.data._embedded.eventEntities;
                });
        }

        $scope.findAllEventsByName = function findAllEventsByName() {

            $http.get('api/events/search/findByNumberOfTicketsIsLessThanNumberOfFreePlacesAndByName?name=' + $scope.eventName
            ).then(function (data) {
                $scope.events = data.data._embedded.eventEntities;
            });
        }

        $scope.createTicket = function (event) {
            event.numberOfTickets++;
            var updatePromise = $http.post('api/events', event);
            var savePromise = $http.post('api/tickets', {
                "status": "NEW",
                "owner": $rootScope.credentials._links.self.href,
                "event": event
            });

            $q.all([updatePromise,savePromise]).then(function(data)
                {
                    $state.go("manageTickets");
                },
                function(errorData){
                    alert("Failed to create ticket");
                    console.log(errorData);
                    //todo handle revert of second promise
                })
        }
    });
