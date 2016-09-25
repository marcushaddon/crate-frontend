crate.controller('FrontPageCtrl', function($scope, $location, albumFactory, clerk){
  $scope.latestAlbums    = [];
  $scope.latestPlaylists = [];
  $scope.today = new Date();

  $scope.init = function() {
    albumFactory.getLatestAlbums(4,0).then(function(response){
      $scope.latestAlbums = response.data;
    });

    clerk.getLatestPlaylists(4, 0).then(function(response){
      $scope.latestPlaylists = response.data;
    })
  }
});
