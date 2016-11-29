crate.controller('albumTileCtrl', function($scope, stereo, albumFactory, messenger) {
  $scope.isActiveList = function() {
    var id;
    if ($scope.album) {
      id = $scope.album._id;
    } else {
      id = $scope.playlist._id;
    }
    return stereo.activeList._id === id;
  };
  $scope.playToggle = function() {
    var id;
    var iAmAnAlbum;
    if ($scope.album) {
      iAmAnAlbum = true;
      id = $scope.album._id;
    } else {
      iAmAnAlbum = false;
      id = $scope.playlist._id;
    }

    if (stereo.activeList._id !== id) {
      if (iAmAnAlbum) {
        stereo.activeList = $scope.album;
        albumFactory.getTracksByAlbumId($scope.album._id)
        .then(function(response){
          stereo.setActiveTracks(response.data);
          stereo.setTrack(stereo.activeTracks[0]);
          albumFactory.incrementListens($scope.album._id);
        });
      } else {
        stereo.activeList = $scope.playlist;
        stereo.setActiveTracks($scope.playlist.tracks);
        stereo.setTrack(stereo.activeTracks[0]);
        playlistFactory.incrementListens($scope.playlist._id);
      }
    } else {
      stereo.playToggle();
    }


  };
});
