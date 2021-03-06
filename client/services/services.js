angular.module('jobsearch.services', [])

  .factory('ApiCalls', function($http) {
    var log = function(searchTerms) {
      return $http({
        method: 'POST',
        url: '/api/logs',
        data: searchTerms
      })
      .then(function(res) {
        return res.data;
      })
      .catch(function(err) {
        console.error('POST /api/logs error: ', err);
        throw new Error;
      })
    };

    var search = function(searchTerms, userIP) {
      // Angular's $http jsonp method (which accounts for browser protection against XSS) changes its generic JSON_CALLBACK function wrapper name to a name with periods (.) that the following (outdated?) URL doesn't work with,
      // so we must use jQuery to get around this. Also, this URL doesn't convert to https.
      return $.ajax({
        url: 'http://api.indeed.com/ads/apisearch?publisher=2878037053725137&format=json&q=' + searchTerms.jobTitle + '&l=' + searchTerms.zipCode + '&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=0&co=us&chnl=FJR&userip=' + userIP + '&useragent=Mozilla/%2F4.0%28Firefox%29&v=2',
        dataType: 'jsonp',
        type: 'GET',
        success: function(res) {
          return res;
        },
        error: function(xhr, status, err) {
          console.error('api.indeed.com error: ', err);
          throw new Error;
        }.bind(this)
      })
    };

    var signin = function(admin, password) {
      return $http({
        method: 'POST',
        url: '/api/admin',
        data: {username: admin, password: password}
      })
      .then(function(res) {
        return res.status;
      })
      .catch(function(err) {
        console.error('/api/admin error: ', err);
        throw new Error;
      })
    };

    var getLogs = function() {
      return $http({
        method: 'GET',
        url: '/api/logs'
      })
      .then(function(res) {
        return res.data;
      })
      .catch(function(err) {
        console.error('GET /api/logs error: ', err);
        throw new Error;
      })
    };

    var adminTrack = function(script) {
      return $http({
        method: 'POST',
        url: '/api/track',
        data: { customScript: script }
      })
      .then(function(res) {
        return res.data;
      })
      .catch(function(err) {
        console.error('/api/track error: ', err);
        throw new Error;
      })
    };

    return {
      log: log,
      search: search,
      signin: signin,
      getLogs: getLogs,
      adminTrack: adminTrack
    };
  })
  .factory('adminModal', function (btfModal) {
    return btfModal({
      controller: 'myModalControl',
      templateUrl: '../views/modal.html'
    });
  });
