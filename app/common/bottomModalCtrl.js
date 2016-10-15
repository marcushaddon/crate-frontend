crate.controller('bottomModalCtrl', function($scope, playlistFactory, stereo, messenger, user){
  $scope.playlists = [];
  $scope.getCapturedTrack = function() {
    return playlistFactory.capturedTrack;
  };

  $scope.addTrackToPlaylist = function(playlist) {
    playlist.tracks.push(playlistFactory.capturedTrack);
    playlistFactory.editPlaylist(playlist)
    .then(function(response){
      // update our model somehow!
      messenger.show(response.data);
    });
  };



  $scope.$on('modalRefresh', function(){
    playlistFactory.getUserPlaylists(user.info.userId)
    .then(function(response){
      $scope.playlists = response.data;
    });
  })
});
