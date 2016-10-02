crate.controller('PlayerCtrl', function($scope, $rootScope, stereo, messenger){
  $scope.getActiveTrack  = function() { return stereo.activeTrack; };
  $scope.getProgress     = function() { return stereo.getProgress(); };
  $scope.progress = 0;
  $scope.playToggle = function() {
		var state = stereo.playToggle();
	};
  $scope.getIsPlaying    = function() { return stereo.isPlaying; };

  $scope.back = function() {
		// should call a stereo method
    // TODO: use stereo methods, dont go back if at beginning of list
		player.seekTo(stereo.activeTrack.begin);
	};

  $scope.backBack = function() {
		//these are both awful and need to be re written
		stereo.setTrack(stereo.activeTracks[stereo.activeTracks.indexOf(stereo.activeTrack) - 1]);
	};

  $scope.next = function() {
		// wow thats ugly
    var currentIndex = stereo.trackPosition(stereo.activeTrack);
    if (currentIndex >= stereo.activeTracks.length - 1) {
      messenger.show("End of qeueued (sp?) tracks.");
      return;
    }
    var nextTrack = stereo.activeTracks[currentIndex + 1];
		stereo.setTrack(nextTrack);

	};

  $scope.seekTo = function(time) {
		stereo.seekTo(time);
	};

  // This might break if playing a playlist or an album assembled from multiple youtube videos?
	$scope.scrub = function() {
		var newTime = parseFloat(this.getActiveTrack().begin) + parseFloat(this.progress);
		this.seekTo(newTime);
	};

  $scope.update = function() {
		angular.element('#playtime').html(
			app.secToMinSec(stereo.getProgress())
		);
		angular.element('#progress').val(stereo.getProgress());

		if (player.getCurrentTime() >= stereo.activeTrack.stop) {
			$scope.next();
		}
		$scope.$apply();
	};

  $scope.somethingToPlay = function() {    
    if (stereo.activeTrack != null ) {
      return true;
    }
    return false;
  }

  $scope.secToMinSec = function(seconds) {
					var wholeSecs = Math.floor(seconds);
					var secs = (wholeSecs % 60);
					var minutes = (wholeSecs - secs) / 60;
					var seconds = secs < 10 ? '0' + secs.toString() : secs.toString();
					var readOut = minutes + ":" + seconds;
					return readOut;
				};

  $rootScope.$on('stereoUpdate', function(){
		$scope.update();
		$scope.$apply();
	});

});
