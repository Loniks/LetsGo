'use strict';


angular.module('letsgo')
    .controller('manageAdmins', function ($scope, $http) {
        $scope.admins = null;
        findAllAdmins();

        $scope.changeStatus = function changeStatus(admin) {
            if (admin.status == "enable") admin.status = "disable";
            else admin.status = "enable";
            $http.post('api/admins', admin).finally(function () {
                findAllAdmins();
            });
        };

        $scope.deleteAdmin = function deleteAdmin(admin) {
            $http.delete('api/admins/'+ admin.id).finally(function () {
                findAllAdmins();
            });
        };

        function findAllAdmins() {
            $http.get('api/admins')
                .then(function (data) {
                    $scope.admins = data.data._embedded.adminEntities;
                });
        }
    });
