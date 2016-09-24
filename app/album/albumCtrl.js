crate.controller('AlbumCtrl', function($scope, $location, $routeParams, messenger, playlistFactory, albumFactory, clerk){
  $scope.init = function() {

    var albumId = $routeParams.id;
    albumFactory.getAlbum(albumId)
    .then(function(response){
      $scope.album = response.data.album;
      $scope.tracks = response.data.tracks;
    });
  };

  $scope.captureTrack = function(track) {
		playlistFactory.capturedTrack = track;
		angular.element('#bottomModal').openModal();
	};

  $scope.addTrackToPlaylist = function(playlist) {
    var newTracks = playlist.tracks;
    newTracks.push($stereo.capturedTrack);
    playlistFactory.editPlaylist(playlist, 'tracks', newTracks)
    .then(function(response){
      // update our model somehow!
      messenger.show(response.data);
    });
  };

});
