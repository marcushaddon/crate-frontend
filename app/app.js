(function(){

angular.module('main-app', ['ngRoute'])

.config(function($routeProvider){
	$routeProvider.when('/login', {
		templateUrl: 'components/login.html',
		controller: 'Main',
		controllerAs: 'LoginCtrl'
	})

	.when('/home', {
		templateUrl: 'components/home.html'
	})

	.when('/upload', {
		templateUrl: 'components/upload.html',
		controller: 'Uploader'
	})
})

.factory('user', function(){
	return {
		userName: '',
		api_key: 'abba',
		isLoggedIn: false
	}
})

.service('clerk', function($http, user){
	this.fetchMe = function(endPoint, method, data, successCallBack, failureCallBack) {
		console.log("Hitting endpoint: " + endPoint + "and my apikey is " + user.api_key);
		$http({
			method: method,
			url: endPoint,
			data: data,
			headers: { 'api-key': user.api_key } // This will be from probably a user factory
		})
		.then(function(response) { 
			console.log(response);
			successCallBack(response); 
			},
			  function(response) {
			  	console.log(response);
			  	failureCallBack(response); 
			  });
	};

	this.getTracksByAlbumId = function(albumId, successCallBack, failureCallBack) {
		this.fetchMe('/api/tracks/albumId/' + albumId, 'GET', null, successCallBack, failureCallBack);
	};

	this.getPlayLists = function(successCallBack, failureCallBack) {
		this.fetchMe('/api/playlists', 'GET', null, successCallBack, failureCallBack)
	};

	this.uploadAlbum = function(album, successCallBack, failureCallBack) {
		this.fetchMe('/api/upload', 'POST', album, successCallBack, failureCallBack);
	}

	this.logIn = function(userName, password, successCallBack, failureCallBack) {
		this.fetchMe('/login', 'POST', { userName : userName, password: password }, successCallBack, failureCallBack);
	}
 }
)

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

.controller('Main', function($scope, $location, stereo, clerk, user) {
	// Right now this is a global, which is bad, but is being used by the youtube api's onReadyStateChange() function. hmm...
	app                 = this;
	this.lists          = []; // playlists;
	this.activeList     = this.lists[0];
	this.activeTracks   = [];
	this.getActiveTrack = function() { return stereo.activeTrack; };
	this.getIsPlaying   = function() { return stereo.isPlaying; };
	this.getIsLoggedIn  = function() { return user.isLoggedIn; };
	this.loginName      = '';
	this.loginPassword  = '';
	this.progress       = 0;

	this.logIn = function() {
		clerk.logIn(this.loginName, this.loginPassword, function(response) {
			user.userName = response.data.userName;
			user.api_key  = response.data.api_key;
			user.isLoggedIn = true;
			app.init();
			$location.path('/home');
		})
		// Need failure function
	};
	

	this.setActiveList = function(list) {
		this.activeList = list;
		clerk.getTracksByAlbumId(list._id, function(response){
			app.activeTracks = response.data;
		},
		function(response){
			
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
	}

	this.back = function() {
		// should call a stereo method
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

	// This might break if playing a playlist or an album assembled from multiple youtube videos?
	this.scrub = function() { 
		var newTime = parseFloat(this.getActiveTrack().begin) + parseFloat(this.progress);
		this.seekTo(newTime);
	};

	this.update = function() {
		app.progress = stereo.getProgress();
		if (player.getCurrentTime() >= stereo.activeTrack.stop) {
			app.next();
		}
		$scope.$apply();
	}
	
	//better implemented as a custom filter
	this.secToMinSec = function(seconds) {
					var wholeSecs = Math.floor(seconds);
					var secs = (wholeSecs % 60);
					var minutes = (wholeSecs - secs) / 60;
					var seconds = secs < 10 ? '0' + secs.toString() : secs.toString();
					var readOut = minutes + ":" + seconds;
					return readOut;
				};

	this.init = function() {
		clerk.getPlayLists(function(response) {
			console.log(response.data);
			app.lists = response.data;
			console.log("our lists are now " + app.lists);
			app.setActiveList(app.lists[0]);
		});
	}
	

})

.controller('Uploader', function($scope, stereo, clerk){
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
		clerk.uploadAlbum($scope.currentUpload, function(response){
			console.log(response.data);
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

.directive('login', function(){
	return {
		restrict: 'E',
		templateUrl: 'components/login.html',
		controller: 'Main'
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

