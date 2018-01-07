var webLoginController = function($scope, 
                                  $http, 
                                  $location, 
                                  $window, 
                                  angularConfig, 
                                  messenger, 
                                  fbAuthFactory, 
                                  user, 
                                  authTokenFactory){
  $scope.onWeb = angularConfig.context === 'web';
  $scope.init = function() {
    $scope.context = angularConfig.context;
  };

  $scope.fbLogin = function() {
    $window.location.href = angularConfig[angularConfig.environment] + '/auth/facebook';
  };

};

var extensionLoginController = function($scope, angularConfig, $http, $location, $window) {
    $scope.getExtensionId = function() {
      return chrome.runtime.id;
    };
  // bknaoleceflaampejemhijmfieojgcie
    $scope.fbLogin = function() {
      var extensionId = chrome.runtime.id;
      chrome.identity.launchWebAuthFlow(
        {'url': 'https://www.facebook.com/v2.8/dialog/oauth?client_id=1780591808825823&redirect_uri=https://' + extensionId + '.chromiumapp.org/provider_cb&response_type=token',
        'interactive': true},
        function(redirect_url) {
          // This should be replaced
          var startIndex = redirect_url.indexOf("access_token=");
          var endIndex = redirect_url.indexOf("expires");
          var token = redirect_url.slice(startIndex, endIndex - 1);
          $http({
            method: "GET",
            url: angularConfig[angularConfig.environment] + "/auth/extension/facebook/callback?" + token
          })
          .then(function(response) {
            $location.path('/');
          });
        });

    };

};

// https://bknaoleceflaampejemhijmfieojgcie.chromiumapp.org/provider_cb?#acces…OgNhmlvxdLZAbrDNXu78KVxJR2BywBuxa6ZC3ZBDiu3SVc1vZBFa8vLoZD&expires_in=4292

// angularConfig.environment == 'web'
var loginController;
if (angularConfig.context == 'web') {
  loginController = webLoginController;
  console.log("Using web login");
} else {
  loginController = extensionLoginController;
  console.log("Using extension login");
}

crate.controller('login', loginController);
