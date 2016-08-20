crate.controller('login', function($scope, user){
  $scope.loginName    = '';
  $scope.loginPassword     = '';
  $scope.errorMessage = '';

  $scope.submit = function() {
    user.logIn($scope.loginName, $scope.loginPassword);
  };
});
