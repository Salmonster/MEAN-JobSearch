angular.module('jobsearch.services', [])

.factory('Auth', function ($http, $location, $window) {
  var signin = function(user, password) {
    return $http({
      method: 'POST',
      url: '/api/admin',
      data: {user: user, password: password}
    })
    .then(function (resp) {
      console.log('resp.data', resp.data)
      return resp.data;
    });
  };

  // Add function here for job search POST request

  return {
    signin: signin
  };
});
