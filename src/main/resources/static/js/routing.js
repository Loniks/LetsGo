angular.module('loginApp').config(['$stateProvider', '$urlRouterProvider', 'USER_ROLES',
    function($stateProvider, $urlRouterProvider, USER_ROLES) {

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise("/");

        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "home.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.owner, USER_ROLES.guest]
                }

            })
            .state('state1', {
                url: "/state1",
                templateUrl: "state1.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
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
            .state('manageTickets', {
                url: "/manageTickets",
                templateUrl: "manageTickets.html",
                data: {
                    authorizedRoles: [USER_ROLES.guest]
                }
            });
    }
]);
