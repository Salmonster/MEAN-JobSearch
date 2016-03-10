// As our lead module, this must have the same name as 'ng-app' as specified in index.html
// Placing 'ng-app' in index.html gives that view precedence
// This module associates a controller with each view, so controllers don't need to be specified
// in each view's html
var app = angular.module('jobsearch', [
  'jobsearch.services',
  'jobsearch.jobfinder',
  'jobsearch.admin',
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'views/user.html',
    controller: 'SearchController'
  })
  .state('admin', {
    url: '/admin',
    templateUrl: 'views/admin.html',
    controller: 'AdminController'
  })
})
