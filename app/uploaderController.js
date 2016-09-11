crate.controller('Uploader', function($scope, stereo, clerk, messenger){
	$scope.uploadStep = 0;
	$scope.instructions = ["Enter the Youtube Video Id...",
						    "Now enter the name of the artist and the album...",
						    "Great! The audio should begin playing in a couple seconds. When you hear the end of one song, hit the + button to create a cut between two tracks, then enter the name of the track that just ended."];

	$scope.nextStep = function() {
		if ($scope.uploadStep < $scope.instructions.length - 1) {
			if ($scope.currentUpload.artist != '' && $scope.currentUpload.albumName != '') {
				$scope.uploadStep = 2;
				var preview = new Track(0, 'preview', $scope.currentUpload.albumName, $scope.currentUpload.artist, $scope.currentUpload.videoId, 0, 10000); // arbitrarily large number, but I think theres a way to get the videos length?
				stereo.setTrack(preview);
				var endingAdjustment = setTimeout(function(){
					var theEnd = stereo.getVideoLength();
					angular.element('#progress').attr('max', theEnd);
					angular.element('#totalTime').html(' / ' + secToMinSec(theEnd));
					$scope.$apply();
					console.log("THE LENGTH" + stereo.getVideoLength())
				}, 3000);
				$scope.currentUpload.addTrack();
			} else if ($scope.currentUpload.videoId != '') {
				$scope.uploadStep = 1;
			} else {
				$scope.uploadStep = 0;
			}
		}
	}

	$scope.uploadAlbum = function() {
		// Check to make sure everything is cool
		// Set the stop param of the last track
		$scope.currentUpload.createdTracks[$scope.currentUpload.createdTracks.length - 1].stop = stereo.getVideoLength();
		// Make sure none of the tracks start/stop times overlap
		// Send the album
		clerk.uploadAlbum($scope.currentUpload).then(function(response){
			messenger.show(response.data);
		});

	}

	$scope.resetUpload = function() {
		var current           = $scope.currentUpload;
		current.artist        = '';
		current.albumName     = '';
		current.videoId       = '';
		current.createdTracks = [];
		$scope.uploadStep = 0;
	}

	$scope.currentUpload = {
		artist: '',
		albumName: '',
		videoId: '',
		createdTracks: [],
		update: function(track, event) {
			track.trackName = event.target.innerHTML.trim().replace(/<(?:.|\n)*?>/gm, '');
		},
		addTrack: function() {
			var lastTrack = this.createdTracks[this.createdTracks.length - 1];
			var nextTrackNum = this.createdTracks.length + 1;
			if (lastTrack != undefined) {
				lastTrack.stop = stereo.getProgress();
			}
			var startTime = lastTrack == undefined ? 0 : lastTrack.stop;

			var newTrack = new Track(nextTrackNum, 'Track ' + nextTrackNum, this.albumName, this.artist, this.videoId, startTime);
			this.createdTracks.push( newTrack );

			console.log(JSON.stringify(this));
		}
	};
})
