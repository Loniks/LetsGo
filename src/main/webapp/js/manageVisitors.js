'use strict';


angular.module('letsgo')
    .controller('manageVisitors', function ($scope, $http) {
        $scope.visitors = null;
        findAllVisitors();

        $scope.changeStatus = function changeStatus(visitor) {
            if (visitor.status == "enable") visitor.status = "disable";
            else visitor.status = "enable";
            $http.post('api/visitors', visitor).finally(function () {
                findAllVisitors();
            });
        };

        $scope.deleteVisitor = function deleteVisitor(visitor) {
            $http.delete('api/visitors/'+ visitor.id).finally(function () {
                findAllVisitors();
            });
        };

        function findAllVisitors() {
            $http.get('api/visitors')
                .then(function (data) {
                    $scope.visitors = data.data._embedded.visitorEntities;
                });
        }
    });
