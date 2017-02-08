var letsgo = angular.module('letsgo', ['ui.router', 'mgcrea.ngStrap', 'ngResource', 'spring-data-rest']);
letsgo.config(function ($stateProvider) {
    var helloState = {
        name: 'hello',
        url: '/hello',
        templateUrl: "hello.html"
    };

    var aboutState = {
        name: 'about',
        url: '/about',
        templateUrl: "about.html"
    };

    $stateProvider.state(helloState);
    $stateProvider.state(aboutState);
});
letsgo.controller("main", function ($scope) {
    $scope.name = "User Name";
});