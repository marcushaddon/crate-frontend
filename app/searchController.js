crate.controller('SearchCtrl', function($scope, $rootScope, $location, SearchFactory, stereo){
  $scope.searchField = '';
  $scope.results = {};

  $scope.search = function() {
    SearchFactory.search($scope.searchField);
  }

  $scope.testThing = function(){
    console.log($scope.searchField);
  };

  $rootScope.$on('resultsAreIn', function(event, results){
    var parsedResults = JSON.parse(results);
    $scope.results = parsedResults;
  });
});
