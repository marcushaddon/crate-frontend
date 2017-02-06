var webLoginController = function($scope, $http, $location, $window, angularConfig, messenger, fbAuthFactory, user, authTokenFactory){

  $scope.init = function() {
    $scope.context = angularConfig.context;
  };

  $scope.fbLogin = function() {
    $window.location.href = angularConfig[angularConfig.environment] + '/auth/facebook';
  };

  $scope.extensionLogin = function() {
    $http({
      method: 'POST',
      url: '/api/extension/login',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: function(obj) {
           var str = [];
           for(var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
           return str.join("&");
         },
      data: {username: $scope.username, password: $scope.password}
    }).then(function success(response) {
      $location.path('/');
    },
    function failure(response) {
      messenger.show("That key is incorrecet!");
    });
  };

};

var extensionLoginController = function($scope, angularConfig, $http, $location, $window) {

  $scope.sendRequest = function(message, context, callback) {
      var port = chrome.extension.connect({
            name: "Sample Communication"
       });
       port.onMessage.addListener(function(msg) {

          callback(msg, context);
        });
       port.postMessage(message);

    };

    $scope.fbLogin = function() {
      // var msg = {};
      // msg.login = true;
      // $scope.sendRequest(msg, this, function(msg) {
      //   console.log(msg);
      // });

      chrome.identity.launchWebAuthFlow(
        {'url': 'https://www.facebook.com/v2.8/dialog/oauth?client_id=1780591808825823&redirect_uri=https://bknaoleceflaampejemhijmfieojgcie.chromiumapp.org/provider_cb&response_type=token',
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
