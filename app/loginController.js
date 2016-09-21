crate.controller('login', function($scope, $location, user, authTokenFactory){
  $scope.loginName     = '';
  $scope.loginPassword = '';
  $scope.errorMessage  = '';

  $scope.init = function() {
    var token = authTokenFactory.getToken();
    if (token) {
      user.isLoggedIn = true;
      $location.path('/front-page');
    }
  };

  $scope.submit = function() {
    user.logIn($scope.loginName, $scope.loginPassword).then(function(response){
      console.log(response.data);
      user.info = { userName: response.data.userName };
      user.isLoggedIn = true;
      authTokenFactory.setToken(response.data.token);
      $location.path('/front-page');
    });
  };
});
