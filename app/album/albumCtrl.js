crate.controller('AlbumCtrl', function($scope, $location, $routeParams, config, stereo, messenger, user, playlistFactory, albumFactory){
  $scope.albumId = $routeParams.id;
  $scope.init = function() {

    albumFactory.getAlbum($scope.albumId)
    .then(function(response){
      $scope.album = response.data;
    });

    albumFactory.getTracksByAlbumId($scope.albumId)
    .then(function(response){
      var sortedTracks = response.data.sort(function(a, b) { return a.trackNum > b.trackNum; } );
      $scope.tracks = response.data;
    });

  };

  $scope.cueMyTracks = function() {
    stereo.setActiveTracks($scope.tracks);
    albumFactory.incrementListens($scope.albumId);
  };

  $scope.albumImgPlaceHolder = config.albumImgPlaceHolder;
  $scope.userImgPlaceholder = config.userImgPlaceholder;

  // $scope.captureTrack = function(track) {
	// 	playlistFactory.capturedTrack = track;
	// 	angular.element('#bottomModal').openModal();
	// };



  $scope.saveAlbumAsPlaylist = function(album, tracks) {
		playlistFactory.saveAlbumAsPlaylist(album, tracks)
    .then(function(response){
      messenger.show(response.data.name + " created!");
    });
	};

  $scope.crateToggle = function(album) {
    user.toggleCrateAlbum(album)
    .then(function(response){
      if (response.data == "removed") {
        album.iLikeThis = false;
        messenger.show(album.name + " removed from your crate");
      } else {
        album.iLikeThis = true;
        messenger.show(album.name + " added to your crate!");
      }
    })
  };

  // $scope.$on('trackPlayToggle', function(event){
  //   $scope.$emit('listPlayToggle', $scope.album);
  //   // event.stopPropagation();
  // });

});
