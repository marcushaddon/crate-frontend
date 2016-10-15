crate.controller('trackCtrl', function($scope, stereo, playlistFactory){
  $scope.playToggle = function(track) {
    // $scope.$emit('trackPlayToggle', event);
    $scope.$parent.cueMyTracks();
    stereo.setTrack(track);

  };

  $scope.captureTrack = function(track) {
		playlistFactory.capturedTrack = track;
    $scope.$emit('modalRefresh');
		angular.element('#bottomModal').openModal();
	};

  // THIS is what i wanna use
  $scope.isActiveTrack = function(track) {
    if (stereo.activeTrack != {} && stereo.activeTrack != undefined) {
      return stereo.activeTrack._id == track._id;
    } else {
      return false;
    }

  };
});
