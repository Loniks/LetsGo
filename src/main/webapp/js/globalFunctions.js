/**
 * Contains functions that are added to the root AngularJs scope.
 */
angular.module('letsgo').run(function($rootScope, $window, $state, Auth, AUTH_EVENTS) {

    //before each state change, check if the user is logged in
    //and authorized to move onto the next state

    $rootScope.$on('$stateChangeStart', function(event, next) {

        var authorizedRoles = next.data.authorizedRoles;

        if (authorizedRoles && !Auth.isAuthorized(authorizedRoles) && !$window.sessionStorage["userInfo"]) {
            event.preventDefault();
            if (Auth.isAuthenticated()) {
                // user is not allowed
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            } else {
                // user is not logged in
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            }
        }
        if($window.sessionStorage["userInfo"]) {
        	$rootScope.credentials = JSON.parse($window.sessionStorage["userInfo"]);
        	console.log($rootScope.credentials);
            
        }
        
    });

    /* To show current active state on menu */
    $rootScope.getClass = function(path) {
        if ($state.current.name == path) {
            return "active";
        } else {
            return "";
        }
    }

    $rootScope.logout = function() {
        Auth.logout();
    };


});
