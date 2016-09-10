crate.controller('login', function($scope, user, authTokenFactory){
  $scope.loginName     = '';
  $scope.loginPassword = '';
  $scope.errorMessage  = '';

  $scope.init = function() {
    var token = authTokenFactory.getToken();
    if (token) {
      console.log(token);
    }
  };

  $scope.submit = function() {
    user.logIn($scope.loginName, $scope.loginPassword).failure(function(response){
      console.log(response.data);
      $scope.errorMessage = response.data;
    });
  };
});
