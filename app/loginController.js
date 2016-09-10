crate.controller('login', function($scope, $location, user, authTokenFactory){
  $scope.loginName     = '';
  $scope.loginPassword = '';
  $scope.errorMessage  = '';

  $scope.init = function() {
    var token = authTokenFactory.getToken();
    if (token) {
      window.alert(token);
      $location.path('/home');
    } else {
      window.alert("not logged in!");
    }
  };

  $scope.submit = function() {
    user.logIn($scope.loginName, $scope.loginPassword).then(function(response){
      console.log(response.data);
      user.info = { userName: response.data.userName };
      authTokenFactory.setToken(response.data.token);
      $location.path('/home');
    });
  };
});
