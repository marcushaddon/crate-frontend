crate.factory('authInterceptor', function(authTokenFactory, messenger, angularConfig){
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
      // A relative path means the request is to our server and needs our token
      var token = authTokenFactory.getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token;
      }
      // If this is running as a chrom extension, we need to use an absoulte URL
      if (angularConfig.context === 'extension' && config.url.indexOf('api') > -1) {
        config.url = angularConfig[angularConfig.environment] + config.url;
      }
    }


    return config;
  }


});
