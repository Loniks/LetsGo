'use strict';


angular.module('letsgo')
    .controller('manageTickets', function ($scope, $http, $rootScope) {
        $scope.tickets = null;
        findAllTickets();

        $scope.changeStatus = function changeStatus(ticket) {
            if (ticket.status == "CANCELED") ticket.status = "NEW";
            else ticket.status = "CANCELED";
            $http.post('api/tickets', ticket).finally(function () {
                findAllTickets();
            });
        };

        function findAllTickets() {
            $http.get('api/tickets/search/findAllByOwner_Id?id=' + $rootScope.credentials.id)
                .then(function (data) {
                    $scope.tickets = new Array();
                    angular.forEach(data.data._embedded.ticketEntities, function (ticket) {
                        $http.get(ticket._links.event.href)
                            .then(function (data) {
                                ticket.event = data.data;
                                $scope.tickets.push(ticket);
                            });
                    });
                });
        }
    });
