var app = angular.module('app', ['ngRoute']).config([ '$routeProvider', '$locationProvider' ,function($routeProvider, $locationProvider){
/*
    $locationProvider.html5Mode({
        enabled: true

    });
    */
    //      requireBase: false
   $locationProvider.hashPrefix('!');
    //$locationProvider.html5Mode(true);
}]);



