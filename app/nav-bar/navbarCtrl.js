crate.controller('navbarCtrl', function($scope, $location, $window, messenger, fbAuthFactory, user){
  $scope.searchMode = false;
  $scope.searchField = '';
  $scope.search = function() {
    $location.path('search-results/general/' + $scope.searchField);
  };

  $scope.logOut = function() {
    user.logOut();
  };

  $scope.getUser = function() { return user.info; };
  $scope.user = user;

  $scope.fbLogin = function() {
    fbAuthFactory.loginRedirect();
  };

  $scope.goBack = function() {
    $window.history.back();
  };

  $scope.goForward = function() {
    $window.history.forward();
  };
});
