crate.controller('navbarCtrl', function($scope, $location, user){
  $scope.searchMode = false;
  $scope.searchField = '';
  $scope.search = function() {
    $location.path('search-results/' + $scope.searchField);
  };

  $scope.logOut = function() {
    user.logOut();
  };

  $scope.user = user;
  $scope.getUser = function() { return user.info; };
});
