crate.factory('authInterceptor', function(authTokenFactory, messenger, angularConfig){
  return {
    request: checkEnv
  };

  function checkEnv(config) {
      // If this is running as a chrome extension, we need to use an absoulte URL
      if (angularConfig.context === 'extension' && config.url.indexOf('api') > -1) {
        config.url = angularConfig[angularConfig.environment] + config.url;
      }

    return config;
  }


});
