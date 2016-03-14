angular.module('jobsearch.admin', [])

  .controller('AdminController', ['$rootScope', '$scope', '$http', '$log', 'ApiCalls', function($rootScope, $scope, $http, $log, ApiCalls) { 

    $scope.displayStats = function() {
      ApiCalls.getLogs()
        .then(function(stats) {
          stats.forEach(function(stat, index, array) {
            array[index].time = new Date(array[index].time).toString();
          })
          $scope.stats = stats;
        })
        .catch(function(err) {
          console.log('Stats display error: ', err);
        })
    }
    // This function will be called on each item in the ngRepeated array for sorting only
    $scope.sortStats = function(stat) {
      var date = new Date(stat.time);
      return date;
    }

    $scope.update = function() {
      ApiCalls.adminTrack($scope.trackingScript)
        .then(function() {
          alert('The tracking code has been updated!');
        })
        .catch(function(err) {
          console.log('Script update error: ', err);
        })
    }

    $scope.displayStats();
  }])
