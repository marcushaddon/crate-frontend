crate.controller('FrontPageCtrl', function($scope, $location, config, tagFactory, albumFactory, playlistFactory) {
  $scope.latestAlbums    = [];
  $scope.latestPlaylists = [];
  $scope.today = new Date();

  $scope.albumImgPlaceHolder = config.albumImgPlaceHolder;

  $scope.init = function() {
    albumFactory.getLatestAlbums(4,0).then(function(response){
      $scope.latestAlbums = response.data;
    });

    playlistFactory.getLatestPlaylists(4, 0).then(function(response){
      $scope.latestPlaylists = response.data;
    });

    tagFactory.getTopTags(1, 30)
    .then(function(response){
      $scope.topTags = response.data;
    })
  }
});
