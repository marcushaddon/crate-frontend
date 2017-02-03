crate.controller('login', function($scope, $http, $location, $window, angularConfig, messenger, fbAuthFactory, user, authTokenFactory){

  $scope.init = function() {
    $scope.context = angularConfig.context;
  };

  $scope.fbLogin = function() {
    $window.location.href = 'https://cratebeta.herokuapp.com/auth/facebook';
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

});
