crate.factory('authInterceptor', function(authTokenFactory, messenger){
  return {
    request: addToken
  };

  function addToken(config) {
    // Check to see if we are making a request to a server other than our own, and if not, skip the headers
    // This is because Discogs' API doesn't like our Authorization headers

    if (config.method !== 'GET' && !authTokenFactory.getToken()) {
      messenger.show("You need to create an account or sign in to do that!");
      // Hmm can we cancel the request??
      return config;
    }
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
