var letsgo = angular.module('letsgo', ['ui.router', 'mgcrea.ngStrap', 'ngResource', 'spring-data-rest']);
letsgo.config(function ($stateProvider, $locationProvider) {
    var aboutState = {
        name: 'about',
        url: '/about',
        templateUrl: "about.html"
    };
    $stateProvider.state(aboutState);
    
    var addAdminState = {
        name: 'addAdmin',
        url: '/addAdmin',
        templateUrl: "addAdmin.html"
    };
    $stateProvider.state(addAdminState);
    
    var addEventState = {
        name: 'addEvent',
        url: '/addEvent',
        templateUrl: "addEvent.html"
    };
    $stateProvider.state(addEventState);

    var homeState = {
        name: 'home',
        url: '/home',
        templateUrl: "home.html"
    };

    $stateProvider.state(homeState);

    var logInAdminState = {
        name: 'logInAdmin',
        url: '/admin/log',
        templateUrl: "logInAdmin.html"
    };
    
    $stateProvider.state(logInAdminState);
    
    var logInOwnerState = {
        name: 'logInOwner',
        url: '/owner/log',
        templateUrl: "logInOwner.html"
    };

    $stateProvider.state(logInOwnerState);
    
    var logInVisitorState = {
        name: 'logInVisitor',
        url: '/visitor/log',
        templateUrl: "logInVisitor.html"
    };

    $stateProvider.state(logInVisitorState);

    var manageAdminState = {
        name: 'manageAdmin',
        url: '/admin/manage',
        templateUrl: "manageAdmin.html"
    };

    $stateProvider.state(manageAdminState);
    
    var manageEventsState = {
        name: 'manageEvents',
        url: '/event/manage',
        templateUrl: "manageEvents.html"
    };

    $stateProvider.state(manageEventsState);
    
    var manageOwnersState = {
        name: 'manageOwners',
        url: '/owner/manage',
        templateUrl: "manageOwners.html"
    };

    $stateProvider.state(manageOwnersState);
    
    var manageTicketsState = {
        name: 'manageTickets',
        url: '/ticket/manage',
        templateUrl: "manageTickets.html"
    };

    $stateProvider.state(manageTicketsState);
    
    var registerOwnerState = {
        name: 'registerOwner',
        url: '/owner/register',
        templateUrl: "registerOwner.html"
    };

    $stateProvider.state(registerOwnerState);
    
    var registerVisitorState = {
        name: 'registerVisitor',
        url: '/visitor/register',
        templateUrl: "registerVisitor.html"
    };

    $stateProvider.state(registerVisitorState);
    
    var searchEventState = {
        name: 'searchEvent',
        url: '/event/search',
        templateUrl: "searchEvent.html"
    };

    $stateProvider.state(searchEventState);
    
    var viewEventState = {
        name: 'viewEvent',
        url: '/event/view',
        templateUrl: "viewEvent.html"
    };

    $stateProvider.state(viewEventState);
    
    var viewTicketState = {
        name: 'viewTicket',
        url: '/ticket/view',
        templateUrl: "viewTicket.html"
    };
    $locationProvider.html5Mode(true);
    $stateProvider.state(viewTicketState);
});

letsgo.controller("main", function ($scope) {
    $scope.name = "User Name";
});