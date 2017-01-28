crate.controller('login', function($scope, $http, $location, $window, messenger, fbAuthFactory, user, authTokenFactory){

  $scope.init = function() {
    // var token = authTokenFactory.getToken();
    // if (token) {
    //   user.refreshUser()
    //   .then(function(response){
    //     user.info = response.data;
    //   });
    //
    //   $location.path('/front-page');
    // }
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
      console.log(response.headers('set-cookie'));
      console.log(response.headers);
      $location.path('/');
    });
  };

});
