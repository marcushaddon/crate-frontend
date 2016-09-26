crate.controller('navbarCtrl', function($scope, $location){
  $scope.searchMode = false;
  $scope.searchField = '';
  $scope.search = function() {
    $location.path('search-results/' + $scope.searchField);
  };
});
