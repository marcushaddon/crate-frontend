crate.controller('albumTileCtrl', function($scope, stereo, albumFactory, user, messenger) {
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

  $scope.crateToggle = function() {
    if ($scope.album) {
      user.toggleCrateAlbum($scope.album)
      .then(function(response) {
        if (response.data == 'removed') {
          $scope.album.iLikeThis = false;
          messenger.show($scope.album.name + " removed from your crate.");
        } else {
          $scope.album.iLikeThis = true;
          messenger.show($scope.album.name + " added to your crate!");
        }
      })
    } else {
      user.toggleCratePlaylist($scope.playlist)
      .then(function(response){
        if (response.data == 'removed') {
          $scope.playlist.iLikeThis = false;
          messenger.show($scope.playlist.name + " removed from your crate.");
        } else {
          $scope.playlist.iLikeThis = true;
          messenger.show($scope.playlist.name + " added to your crate!");
        }
      });
    }
  };
});
