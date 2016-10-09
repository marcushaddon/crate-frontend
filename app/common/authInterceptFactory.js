crate.factory('authInterceptor', function(authTokenFactory){
  return {
    request: addToken
  };

  function addToken(config) {
    // Check to see if we are making a request to a server other than our own, and if not, skip the headers
    // This is because Discogs' API doesn't like our Authorization headers
    if (config.url.indexOf('http') < 0) {
      var token = authTokenFactory.getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token;
      }
    }


    return config;
  }
});
