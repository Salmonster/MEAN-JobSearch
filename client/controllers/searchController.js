angular.module('jobsearch.jobfinder', [])

  .controller('SearchController', ['$rootScope', '$scope', '$http', '$log', 'ApiCalls', function($rootScope, $scope, $http, $log, ApiCalls) { 

    //mere testing
    $scope.routeCheck = 'Routing worked';
    $log.log('$scope.routeCheck:', $scope.routeCheck);

    $scope.searchTerms = {jobTitle: '', zipCode: ''};
    $scope.search = false;
    // $scope.searchTerms.jobTitle = '';
    // $scope.searchTerms.zipCode = '';

    $scope.submit = function() {
      // $scope.searchTerms.jobTitle = $scope.searchTerms.jobTitle.trim();
      // $scope.searchTerms.zipCode = $scope.searchTerms.zipCode.trim();
      // ApiCalls.search($scope.searchTerms);
      // .then(function(data) {
      //   console.log('data:\n', data);
      // })
      // .catch(function(error) {
      //   console.error('Message:\n', error); //or error.data.error?
      // });
      $scope.searchTerms.jobTitle = '';
      $scope.searchTerms.zipCode = '';
      $scope.search = true;
    }
  
  }]);
