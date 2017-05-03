'use strict';


angular.module('letsgo')
    .controller('manageAdmins', function ($scope, $http, user, $window, Auth) {
        $scope.admins = null;
        findAllAdmins();

        $scope.changeStatus = function changeStatus(admin) {
            if (admin.status == "enable") admin.status = "disable";
            else admin.status = "enable";
            alert(admin.status);
            $http.post('api/admins', admin).then(function () {
                findAllAdmins();
            });
        };

        $scope.deleteAdmin = function deleteAdmin(admin) {
            $http.delete('api/admins', admin).then(function () {
                findAllAdmins();
            });
        };

        function findAllAdmins() {

            $http.get('api/admins')
                .then(function (data) {
                    $scope.admins = data._embedded.adminEntities;
                });
        }
    });
