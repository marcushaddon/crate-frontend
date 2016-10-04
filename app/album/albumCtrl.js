crate.controller('AlbumCtrl', function($scope, $location, $stateParams, config, stereo, messenger, playlistFactory, albumFactory){
  $scope.init = function() {

    var albumId = $stateParams.id;

    albumFactory.getAlbum(albumId)
    .then(function(response){
      $scope.album = response.data;
    });

    albumFactory.getTracksByAlbumId(albumId)
    .then(function(response){
      $scope.tracks = response.data;
    });

  };

  $scope.cueMyTracks = function() {
    stereo.setActiveTracks($scope.tracks);
  };

  $scope.albumImgPlaceHolder = config.albumImgPlaceHolder;
  $scope.userImgPlaceholder = config.userImgPlaceholder;

  // $scope.captureTrack = function(track) {
	// 	playlistFactory.capturedTrack = track;
	// 	angular.element('#bottomModal').openModal();
	// };

  $scope.addTrackToPlaylist = function(playlist) {
    var newTracks = playlist.tracks;
    newTracks.push($stereo.capturedTrack);
    playlistFactory.editPlaylist(playlist, 'tracks', newTracks)
    .then(function(response){
      // update our model somehow!
      messenger.show(response.data);
    });
  };

  $scope.saveAlbumAsPlaylist = function(album) {
		playlistFactory.saveAlbumAsPlaylist(album)
    .then(function(response){
      $scope.myPlaylists.push(response.data);
      messenger.show(response.data.name + " created!");
    });
	};

  $scope.favoriteToggle = function(album) {
    messenger.show("Soon you'll be able to like " + album.name + "! Just not yet...");
  };

  // $scope.$on('trackPlayToggle', function(event){
  //   $scope.$emit('listPlayToggle', $scope.album);
  //   // event.stopPropagation();
  // });

});
