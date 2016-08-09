(function(){

angular.module('main-app', [])

.factory('stereo', function(){
	return {
		activeTrack: {},
		progress: 0,
		isPlaying: false,

		getProgress: function() {
			return player.getCurrentTime() - this.activeTrack.begin;
		},

		setTrack: function(track) {
			this.activeTrack = track;
			player.loadVideoById({ videoId: this.activeTrack.videoId, startSeconds: this.activeTrack.begin });
			this.isPlaying   = true;
		},

		playToggle: function() {
			switch(player.getPlayerState()) {
	      	  case -1:
		      case 0:
		      case 2:
		      case 3:
		      case 5:
		        player.playVideo();
		        this.isPlaying = true;
		        break;
		      default:
		        player.pauseVideo();
		        this.isPlaying = false;
		      }
		      return player.getPlayerState();
		},

		seekTo: function(time) {
			player.seekTo(time);
		}
	}
})

.controller('Main', function($scope, $http, stereo){
	// Right now this is a global, which is bad, but is being used by the youtube api's onReadyStateChange() function. hmm...
	app                 = this;
	this.lists          = []; // playlists;
	this.activeList     = this.lists[0];
	this.activeTracks   = [];
	this.getActiveTrack = function() { return stereo.activeTrack; };
	this.getIsPlaying   = function() { return stereo.isPlaying; };
	this.progress       = 0;
	

	this.setActiveList = function(list) {
		this.activeList = list;
		$http.get('/api/tracks/albumId/' + list._id)
			.then(function(response){
				app.activeTracks = response.data;
				console.log(response.data);
			});
	};

	this.toggleUpdate = function(playerState) {
		switch(playerState) {
	      	  case -1:
		      case 0:
		      case 2:
		      case 3:
		      case 5:
		        window.clearInterval(loop);
	        	loop = false;
		        break;
		      default:
		        loop = window.setInterval(this.update, 1000);
		      }
		};
	

	this.setTrack = function(track) {
		stereo.setTrack(track);
		// if (!loop) {
	 //      loop = setInterval(this.update, 1000);
	 //    }
	};

	this.isActiveList = function(list) {
		if (app.activeList == list) {
			return true;
		} else {
			return false;
		}
	};

	this.isActiveTrack = function(track) {
		if (stereo.activeTrack == track) {
			return true;
		} else {
			return false;
		}
	};

	this.playToggle = function() {
		var state = stereo.playToggle();
		console.log(stereo.activeTrack);
	}

	this.back = function() {
		player.seekTo(stereo.activeTrack.begin);
	};

	this.backBack = function() {
		//these are both awful and need to be re written
		stereo.setTrack(app.activeTracks[app.activeTracks.indexOf(app.getActiveTrack()) - 1]);
	};

	this.next = function() {
		// wow thats ugly
		stereo.setTrack(app.activeTracks[app.activeTracks.indexOf(app.getActiveTrack()) + 1]);
	};

	this.seekTo = function(time) {
		stereo.seekTo(time);
	};

	// This might break if playing a playlist or an album assembled from multiple youtube videos.
	this.scrub = function() { 
		console.log('progress: ' + this.progress);
		console.log('starting point: ' + this.getActiveTrack().begin);
		var newTime = parseFloat(this.getActiveTrack().begin) + parseFloat(this.progress);
		console.log("newtime: " + newTime);
		this.seekTo(newTime);
	};

	this.update = function() {
		app.progress = stereo.getProgress();
		if (player.getCurrentTime() >= stereo.activeTrack.stop) {
			console.log("THATS ALL FOLKS");
			app.next();
		}
		$scope.$apply();
		console.log(app.progress);
	}

	this.viewController = {
		defaultView: true,
		uploaderView: false,
		uploaderToggle: function(showUploader) {
			this.defaultView = !showUploader;
			this.uploaderView = showUploader;
		}
	};
	
	//better implemented as a custom filter
	this.secToMinSec = function(seconds) {
					var wholeSecs = Math.floor(seconds);
					var secs = (wholeSecs % 60);
					var minutes = (wholeSecs - secs) / 60;
					var seconds = secs < 10 ? '0' + secs.toString() : secs.toString();
					var readOut = minutes + ":" + seconds;
					return readOut;
				};

	$http.get('/api/playlists')
		.then(function(response){
			app.lists = response.data;
			console.log(response.data)
			app.activeList = app.lists[0];
			// callback hell!!
			$http.get('/api/tracks/albumId/' + app.activeList._id)
				.then(function(response){
					app.activeTracks = response.data;
					app.activeTrack = app.activeTracks[0];
					console.log(response.data);
				});
		});
})

.controller('Uploader', function($scope, $http, stereo){
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
				$scope.currentUpload.addTrack();
				console.log("I should play maybe?");
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
		// Make sure none of the tracks start/stop times overlap
		// Send the album
		var upload = JSON.stringify($scope.currentUpload);
		$http.post('/api/upload', upload)
		.success(function(data, status, headers, config){
			console.log(data);
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

.directive('savedPlaylists', function(){
	return {
		restrict: 'E',
		templateUrl: 'components/saved-playlists.html'
	};
})

.directive('currentPlaylist', function(){
	return {
		restrict: 'E',
		templateUrl: 'components/current-playlist.html'
	};
})


.directive('navBar', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'components/nav-bar.html',
		controller: function(){},
		controllerAs: 'navBar'
	};
})

.directive('player', function(){
	return {
		restrict: 'E',
		templateUrl: 'components/player.html'
	};
})

.directive('uploader', function(){
	return {
		restrict: 'E',
		templateUrl: 'components/uploader.html',
		controller: 'Uploader',
		controllerAs: 'UploadCtrl'
	}
})

.directive('uploadVideo', function(){
	return {
		restrict: 'E',
		templateUrl: 'components/upload-video.html',
		controller: 'Uploader',
		contollerAs: 'UploadCtrl'
	}
});


})();

