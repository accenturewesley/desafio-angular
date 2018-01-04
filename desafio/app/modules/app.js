
var app = angular.module('Desafio', ['ngRoute']);


app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: './app/views/desafio.html'
        })
});

// app.config(function($routeProvider) {
//     $routeProvider
//     .when("/", {
//         templateUrl : './app/views/desafio.html'
//     })
// });