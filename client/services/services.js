angular.module('jobsearch.services', [])

.factory('ApiCalls', function($http) {
  var search = function(searchTerms) {
    return $http({
      method: 'POST',
      url: 'http://api.indeed.com/ads/apisearch?publisher=2878037053725137&q=java&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=0&co=us&chnl=FJR&userip=' + userIPaddress + '&useragent=Mozilla/%2F4.0%28Firefox%29&v=2',
      data: searchTerms
    })
    .then(function(res) {
      console.log('res.data', res.data)
      return res.data;
    });
  };

  var signin = function(user, password) {
    return $http({
      method: 'POST',
      url: '/api/admin',
      data: {user: user, password: password}
    })
    .then(function(res) {
      console.log('res.data', res.data)
      return res.data;
    });
  };

  return {
    search: search,
    signin: signin
  };
});
