// As our lead module, this must have the same name as 'ng-app' as specified in index.html
// Placing 'ng-app' in index.html gives that view precedence
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
    url: '/api/admin',
    templateUrl: 'views/admin.html',
    controller: 'AdminController'
  })
})
