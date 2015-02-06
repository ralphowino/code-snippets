var myApp = angular.module('myApp', ['myApp', 'ngMockE2E', 'ngResource']);
myApp.run(function ($httpBackend, $http) {


    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://beta.json-generator.com/api/json/get/J4F5CVh", false );
    xmlHttp.send( null );
    var projects =  xmlHttp.responseText;


    $httpBackend.whenGET('api/v1/projects').respond(projects);
    $httpBackend.whenGET(function (url) {
        return url.indexOf('json-generator') > -1;
    }).passThrough();
});


myApp.controller('ProjectsController', function ($scope, Project) {
    $scope.title = "My Projects";
    $scope.projects = Project.query();
});

myApp.factory('Project', function ($resource) {
    return $resource('api/v1/projects/:id', {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
});