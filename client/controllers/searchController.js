angular.module('jobsearch.jobfinder', [])

  .controller('SearchController', ['$rootScope', '$scope', '$http', '$log', 'ApiCalls', 'adminModal', function($rootScope, $scope, $http, $log, ApiCalls, adminModal) { 

    $scope.searchTerms = {jobTitle: '', zipCode: ''};
    $scope.jobs = [];
    $scope.search = false;


    // TODO: add links to job post listings in ng-repeat with an 'a' tag



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
      .catch(function(err) {
        console.log('DB logging error: ', err);
      });
      $scope.search = true;
    }
  
  }])
  .controller('myModalControl', ['$scope', 'adminModal', 'ApiCalls', '$location', function ($scope, adminModal, ApiCalls, $location) {
    
    $scope.closeMe = adminModal.deactivate;
    $scope.login = function () {
      ApiCalls.signin($scope.admin, $scope.password)
        .then(function(res) {
          $scope.closeMe();
          $location.path('/admin');
        })
        .catch(function(err) {
          alert('Incorrect username or password');
          console.log('Login error: ', err);
        })
    }
  }])
  .controller('modalControl', ['$scope', 'adminModal', function ($scope, adminModal) {
    
    $scope.showModal = adminModal.activate;
    
  }]);
