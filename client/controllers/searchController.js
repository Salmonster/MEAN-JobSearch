angular.module('jobsearch.jobfinder', [])

  .controller('SearchController', ['$rootScope', '$scope', '$http', '$log', 'ApiCalls', function($rootScope, $scope, $http, $log, ApiCalls) { 

    $scope.searchTerms = {jobTitle: '', zipCode: ''};
    $scope.jobs = [];
    $scope.search = false;


    // TODO: HANDLE ADMIN AUTH WITH A MODAL, MAKE SURE TO ADD REFS TO USER.HTML
    // TODO: add link to job post functionality in ng-repeat with an 'a' tag



    $scope.submit = function() {
      $scope.searchTerms.jobTitle = $scope.searchTerms.jobTitle.trim();
      $scope.searchTerms.zipCode = $scope.searchTerms.zipCode.trim();
      ApiCalls.log($scope.searchTerms)
      .then(function(IP) {
        ApiCalls.search($scope.searchTerms, IP)
          // Using jQuery's promise handlers since we're returning an AJAX call above
          .done(function(res) {
            console.log('Indeed API response: ', res);
            // Use $scope.$apply in non-Angular callbacks (here, jQuery) to alter Angular $scope
            $scope.$apply(function() {
              $scope.jobs = res.results;
            });
          })
          .fail(function(err) {
            console.log('Indeed API call error: ', err);
          })
      })
      .catch(function(error) {
        console.log('Message:\n', error);
      });
      $scope.search = true;
    }
  
  }]);
