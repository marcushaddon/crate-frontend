crate.controller('playlistCtrl', function($scope, $routeParams, $http, playlistFactory, stereo, config, messenger){
  $scope.playlist = {};
  $scope.playlistId = $routeParams.id;
  $scope.init = function() {
    if ($scope.playlistId) {
      playlistFactory.getPlaylist($scope.playlistId)
      .then(function(response){
        $scope.playlist = response.data;
      },
      function(response){
        messenger.show(response.data);
      });
    }
  };

  $scope.cueMyTracks = function() {
    playlistFactory.incrementListens($scope.playlistId);
    stereo.setActiveTracks($scope.playlist.tracks);
  };

  $scope.favoriteToggle = function(playlist) {
    messenger.show("Soon you'll be able to 'like' " + playlist.name + ", but not just yet...");
  };

  $scope.copyPlaylist = function(playlist) {
    alert("COPTCAT??!");
  };

  $scope.albumImgPlaceholder = config.albumImgPlaceHolder;
});
