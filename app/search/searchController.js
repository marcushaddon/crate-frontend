crate.controller('SearchCtrl', function($scope, $http, $rootScope, $location, $stateParams, stereo){
  $scope.results = {};

  $scope.search = function() {
    $http({
      method: 'GET',
      url: '/api/search/' + $stateParams.searchField
    }).then(function(response){
      console.log(response.data);
      $scope.results = JSON.parse(response.data);
    });
  };

  $scope.cueMyTracks = function() {
    stereo.setActiveTracks($scope.results.tracks);
  };

});
