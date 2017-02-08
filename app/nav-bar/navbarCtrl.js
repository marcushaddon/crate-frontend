crate.controller('navbarCtrl', function($scope, $location, $window, stereo, messenger, fbAuthFactory, user){
  $scope.searchMode = false;
  $scope.searchField = '';
  $scope.onWeb = angularConfig.context === "web";

  $scope.getNowPlaying = function() {
    var current = stereo.getCurrentList();
    var currentPath = '#/' + current.listType + '/' + current._id;
    return currentPath;
  };

  $scope.testThing = function() {
    alert("TESTING");
  };

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
