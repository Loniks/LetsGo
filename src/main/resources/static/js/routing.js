angular.module('loginApp').config(['$stateProvider', '$urlRouterProvider', 'USER_ROLES',
    function($stateProvider, $urlRouterProvider, USER_ROLES) {

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise("/guest");

        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "home.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.owner, USER_ROLES.visitor]
                }

            })
            .state('guest', {
                url: "/guest",
                templateUrl: "guest.html"
            })
            .state('state2', {
                url: "/state2",
                templateUrl: "state2.html",
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
            .state('manageOwners', {
                url: "/manageOwners",
                templateUrl: "manageOwners.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('searchEvent', {
                url: "/searchEvent",
                templateUrl: "searchEvent.html",
                data: {
                    authorizedRoles: [USER_ROLES.visitor]
                }
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
