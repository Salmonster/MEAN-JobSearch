angular.module('jobsearch.jobfinder', [])

  .controller('SearchController', ['$rootScope', '$scope', '$http', '$log', 'Auth', function($rootScope, $scope, $http, $log, Auth) { 

    $scope.routeCheck = 'Routing worked';
    $log.log("$scope.routeCheck:", $scope.routeCheck);
  
  }]);
