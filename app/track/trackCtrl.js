crate.controller('trackCtrl', function($scope, stereo, messenger, user, playlistFactory){
  $scope.playToggle = function(track, option) {
    $scope.$parent.cueMyTracks(option);
    if (stereo.activeTrack !== track) {
      stereo.setTrack(track);
    } else {
      stereo.playToggle();
    }


  };

  $scope.captureTrack = function(track) {
		playlistFactory.capturedTrack = track;
    $scope.$emit('modalRefresh');

		angular.element('#bottomModal').modal('open');
	};

  // THIS is what i wanna use
  $scope.isActiveTrack = function(track) {
    if (stereo.activeTrack != {} && stereo.activeTrack != undefined) {
      return stereo.activeTrack._id == track._id;
    } else {
      return false;
    }

  };

  $scope.crateToggle = function(track) {
    user.toggleCrateTrack(track)
    .then(function(response) {
      if (response.data !== "removed") {
        track.iLikeThis = true;
        messenger.show(track.trackName + " added to crate!");
      } else {
        track.iLikeThis = false;
        messenger.show(track.trackName + " removed from crate.");
      }
    });
  };
});
