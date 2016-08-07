(function(){
	angular.module('main-app', [])

	.controller('Uploader', function($scope, $http){
	$scope.uploadStep = 0;
	$scope.instructions = ["Enter the Youtube Video Id... (<a href='https://www.google.com/?ion=1&espv=2#q=find%20youtube%20video%20id' target=''>help</a>)",
						    "Now enter the name of the artist and the album...",
						    "Great! The audio should begin playing in a couple seconds. When you hear the end of one song, hit the + button to create a cut between two tracks, then enter the name of the track that just ended."];
	$scope.nextStep = function() {
		if ($scope.uploadStep < $scope.instructions.length - 1) {
			if ($scope.currentUpload.artist != '' && $scope.currentUpload.albumName != '') {
				$scope.uploadStep = 2;
				player.loadVideoById($scope.currentUpload.videoId);
				console.log("I should play maybe?");
			} else if ($scope.currentUpload.videoId != '') {
				$scope.uploadStep = 1;
			} else {
				$scope.uploadStep = 0;
			}
			
		}
	}
	$scope.resetUpload = function() {
		var current = $scope.currentUpload;
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
		addTrack: function() {
			var nextTrackNum = this.createdTracks.length + 1;
			this.createdTracks.push( new Track(nextTrackNum, '', this.albumName, this.artist, this.videoId) );
			console.log(JSON.stringify(this));
		}
	};
		
		
	
})
})();