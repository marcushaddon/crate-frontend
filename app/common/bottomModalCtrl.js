crate.controller('bottomModalCtrl', function($scope, playlistFactory, stereo, messenger, user){
  $scope.playlists = [];
  $scope.getCapturedTrack = function() {
    return playlistFactory.capturedTrack;
  };

  $scope.addTrackToPlaylist = function(playlist) {
    event.preventDefault();
    playlist.tracks.push(playlistFactory.capturedTrack);
    playlistFactory.editPlaylist(playlist)
    .then(function(response){
      // update our model somehow!
      messenger.show(playlistFactory.capturedTrack.trackName + " added to " + playlist.name);
      angular.element('#bottomModal').closeModal();
    });
  };



  $scope.$on('modalRefresh', function(){
    playlistFactory.getUserPlaylists(user.info.userId)
    .then(function(response){
      $scope.playlists = response.data;
    });
  })
});
