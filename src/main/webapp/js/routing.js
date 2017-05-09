angular.module('letsgo').config(['$stateProvider', '$urlRouterProvider', 'USER_ROLES',
    function ($stateProvider, $urlRouterProvider, USER_ROLES) {

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise("/");

        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "home.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.owner, USER_ROLES.visitor]
                }
            })
            .state('registerVisitor', {
                url: "/registerVisitor",
                templateUrl: "registerVisitor.html"
            })
            .state('registerOwner', {
                url: "/registerOwner",
                templateUrl: "registerOwner.html"
            })
            .state('guest', {
                url: "/guest",
                templateUrl: "guest.html",
                data: {}
            })
            .state('addAdmin', {
                url: "/addAdmin",
                templateUrl: "addAdmin.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('manageEvents', {
                url: "/manageEvents",
                templateUrl: "manageEvents.html",
                data: {
                    authorizedRoles: [USER_ROLES.owner]
                }
            })
            .state('addEvent', {
                url: "/addEvent",
                templateUrl: "addEvent.html",
                data: {
                    authorizedRoles: [USER_ROLES.owner]
                }
            })
            .state('viewEvent', {
                url: "/viewEvent?id",
                templateUrl: "viewEvent.html",
                data: {
                    authorizedRoles: [USER_ROLES.owner]
                }
            })
            .state('manageOwners', {
                url: "/manageOwners",
                templateUrl: "manageOwners.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('manageVisitors', {
                url: "/manageVisitors",
                templateUrl: "manageVisitors.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('manageAdmins', {
                url: "/manageAdmins",
                templateUrl: "manageAdmins.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('searchEvent', {
                url: "/searchEvent",
                templateUrl: "searchEvent.html",
            })
            .state('manageTickets', {
                url: "/manageTickets",
                templateUrl: "manageTickets.html",
                data: {
                    authorizedRoles: [USER_ROLES.visitor]
                }
            });
    }
]);
