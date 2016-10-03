crate.controller('playlistCtrl', function($scope, $routeParams, $http, playlistFactory, stereo, config, messenger){
  $scope.playlist = {};
  $scope.init = function() {
    var playlistId = $routeParams.id;
    if (playlistId) {
      playlistFactory.getPlaylist(playlistId)
      .then(function(response){
        $scope.playlist = response.data;
      },
      function(response){
        messenger.show(response.data);
      });
    }
  };

  $scope.cueMyTracks = function() {
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
