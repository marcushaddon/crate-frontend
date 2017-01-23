crate.controller('login', function($scope, $location, $window, fbAuthFactory, user, authTokenFactory){

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
    $window.location.href = ('/auth/facebook');
    };

});
