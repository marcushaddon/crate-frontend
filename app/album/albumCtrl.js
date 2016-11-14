crate.controller('AlbumCtrl', function($scope, $location, $routeParams, config, stereo, messenger, playlistFactory, albumFactory){
  $scope.albumId = $routeParams.id;
  $scope.init = function() {

    albumFactory.getAlbum($scope.albumId)
    .then(function(response){
      $scope.album = response.data;
    });

    albumFactory.getTracksByAlbumId($scope.albumId)
    .then(function(response){
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

  $scope.favoriteToggle = function(album) {
    messenger.show("Soon you'll be able to like " + album.name + "! Just not yet...");
  };

  // $scope.$on('trackPlayToggle', function(event){
  //   $scope.$emit('listPlayToggle', $scope.album);
  //   // event.stopPropagation();
  // });

});
