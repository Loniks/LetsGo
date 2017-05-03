'use strict';

angular.module('letsgo')
    .controller('ParentController', ['$scope', '$rootScope', '$modal', 'Auth', 'AUTH_EVENTS', 'USER_ROLES',
        function ($scope, $rootScope, $modal, Auth, AUTH_EVENTS, USER_ROLES) {
            // this is the parent controller for all controllers.
            // Manages auth login functions and each controller
            // inherits from this controller

            $scope.tickets = [{
                "status": "NEW",
                "event": {
                    "name": "Wow event",
                    "description": "Wow description",
                    "address": "Wow street",
                    "startDate": "2017-04-17T09:26:44.674+0000",
                    "duration": "5 hours",
                    "numberOfTickets": 30,
                    "numberOfFreePlaces": 30,
                    "status": "enable",
                    "_links": {
                        "self": {
                            "href": "http://localhost:8080/api/events/1"
                        },
                        "eventEntity": {
                            "href": "http://localhost:8080/api/events/1"
                        },
                        "owner": {
                            "href": "http://localhost:8080/api/events/1/owner"
                        }
                    }
                },
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/tickets/2"
                    },
                    "ticketEntity": {
                        "href": "http://localhost:8080/api/tickets/2"
                    },
                    "event": {
                        "href": "http://localhost:8080/api/tickets/2/event"
                    },
                    "owner": {
                        "href": "http://localhost:8080/api/tickets/2/owner"
                    }
                }
            }]

            $scope.visitors = [{
                "name": "Mike Pitteson",
                "email": "goodVisitor@visitor.com",
                "password": "goodPass",
                "phone": "03211236547",
                "status": "enable",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/visitors/1"
                    },
                    "visitorEntity": {
                        "href": "http://localhost:8080/api/visitors/1"
                    }
                }
            }];

            $scope.event = {
                "name": "Wow event 2",
                "description": "Wow description",
                "address": "Wow street",
                "startDate": "2017-04-17T09:26:44.674+0000",
                "duration": "5 hours",
                "numberOfTickets": 30,
                "numberOfFreePlaces": 30,
                "status": "enable",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/events/2"
                    },
                    "eventEntity": {
                        "href": "http://localhost:8080/api/events/2"
                    },
                    "owner": {
                        "href": "http://localhost:8080/api/events/2/owner"
                    }
                }
            };

            $scope.events = [{
                "name": "Wow event",
                "description": "This is wow event",
                "address": "Wow street",
                "startDate": "2017-04-16T09:26:44.674+0000",
                "duration": "5 hours",
                "numberOfTickets": 30,
                "numberOfFreePlaces": 30,
                "status": "enable",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/events/1"
                    },
                    "eventEntity": {
                        "href": "http://localhost:8080/api/events/1"
                    },
                    "owner": {
                        "href": "http://localhost:8080/api/events/1/owner"
                    }
                }
            }, {
                "name": "Wow event 2",
                "description": "Wow description",
                "address": "Wow street",
                "startDate": "2017-04-17T09:26:44.674+0000",
                "duration": "5 hours",
                "numberOfTickets": 30,
                "numberOfFreePlaces": 30,
                "status": "enable",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/events/2"
                    },
                    "eventEntity": {
                        "href": "http://localhost:8080/api/events/2"
                    },
                    "owner": {
                        "href": "http://localhost:8080/api/events/2/owner"
                    }
                }
            }];

            $scope.owners = [{
                "name": "Big company",
                "email": "bigcompany@company.com",
                "password": "bigPass",
                "contactPerson": "Steve Jonson",
                "phone": "0123456789",
                "status": "enable",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/sponsors/1"
                    },
                    "sponsorEntity": {
                        "href": "http://localhost:8080/api/sponsors/1"
                    }
                }
            }];

            $scope.admins = [{
                "name": "Supper Admin",
                "email": "supper@test.com",
                "password": "supper",
                "role": "ROLE_SUPPER",
                "status": "enable",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/admins/1"
                    },
                    "adminEntity": {
                        "href": "http://localhost:8080/api/admins/1"
                    }
                }
            }];

            $scope.modalShown = false;
            var showLoginDialog = function () {
                if (!$scope.modalShown) {
                    $scope.modalShown = true;
                    var modalInstance = $modal.open({
                        templateUrl: 'login.html',
                        controller: "LoginCtrl",
                        backdrop: 'static',
                    });

                    modalInstance.result.then(function () {
                        $scope.modalShown = false;
                    });
                }
            };

            var setCurrentUser = function () {
                $scope.currentUser = $rootScope.currentUser;
            }

            var showNotAuthorized = function () {
                alert("Not Authorized");
            }

            $scope.currentUser = null;
            $scope.userRoles = USER_ROLES;
            $scope.isAuthorized = Auth.isAuthorized;

            //listen to events of unsuccessful logins, to run the login dialog
            $rootScope.$on(AUTH_EVENTS.notAuthorized, showNotAuthorized);
            $rootScope.$on(AUTH_EVENTS.notAuthenticated, showLoginDialog);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, showLoginDialog);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, showLoginDialog);
            $rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);

        }]);