'use strict';


angular.module('letsgo')
    .controller('manageOwners', function ($scope, $http) {
        $scope.owners = null;
        findAllOwners();

        $scope.changeStatus = function changeStatus(owner) {
            if (owner.status == "enable") owner.status = "disable";
            else owner.status = "enable";
            $http.post('api/sponsors', owner).finally(function () {
                findAllOwners();
            });
        };

        $scope.deleteOwner = function deleteOwner(owner) {
            $http.delete('api/sponsors/'+ owner.id).finally(function () {
                findAllOwners();
            });
        };

        function findAllOwners() {
            $http.get('api/sponsors')
                .then(function (data) {
                    $scope.owners = data.data._embedded.sponsorEntities;
                });
        }
    });
