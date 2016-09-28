crate.controller('login', function($scope, $location, user, authTokenFactory){
  $scope.loginName     = '';
  $scope.loginPassword = '';
  $scope.errorMessage  = '';

  $scope.init = function() {
    var token = authTokenFactory.getToken();
    if (token) {
      user.refreshUser();
      user.isLoggedIn = true;
      $location.path('/front-page');
    }
  };

  $scope.submit = function() {
    user.logIn($scope.loginName, $scope.loginPassword).then(function(response){
      user.setUser({
        userName: response.data.userName,
        userId: response.data.userId
      });
      user.isLoggedIn = true;
      authTokenFactory.setToken(response.data.token);
      $location.path('/front-page');
    });
  };
});
