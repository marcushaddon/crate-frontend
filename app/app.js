(function(){

angular.module('main-app', [])


.controller('Player', function($scope, $http){
	app = this;
	this.lists = []; // playlists;
	this.activeList = this.lists[0];
	this.activeTracks = [];
	this.activeTrack = {};
	

	this.setActiveList = function(list) {
		this.activeList = list;
		$http.get('/api/tracks/albumId/' + list._id)
			.then(function(response){
				app.activeTracks = response.data;
				console.log(response.data);
			});

	};

	// not nessecary till I bring back 'active' vs 'viewed' list
	// this.setViewList = function(list) {
	// 	this.viewList = list;
	// };

	this.setTrack = function(track) {
		this.activeTrack = track;
		// not nessecary till I bring back 'active' vs 'viewed' list
		// if (this.activeTracks.indexOf(this.activeTrack) == -1) {
		// 	this.activeList = this.viewList;
		// }
		player.loadVideoById({ videoId: app.activeTrack.videoId, startSeconds: app.activeTrack.begin });
		this.isPlaying = true;
		if (!loop) {
	      loop = setInterval(this.update, 1000);
	    }


	};

	this.isActiveList = function(list) {
		if (app.activeList == list) {
			return true;
		} else {
			return false;
		}
	};

	// not nessecary till I bring back 'active' vs 'viewed' list
	// this.isViewList = function(list) {
	// 	if (app.viewList == list) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// };

	this.isActiveTrack = function(track) {
		if (app.activeTrack == track) {
			return true;
		} else {
			return false;
		}

		return player.getPlayerState();
	};

	this.progress = 0;

	this.isPlaying = false;

	this.playToggle = function() {
		switch(player.getPlayerState()) {
      	  case -1:
	      case 0:
	      case 2:
	      case 3:
	      case 5:
	        player.playVideo();
	        this.isPlaying = true;
	        loop = window.setInterval(this.update, 1000);
	        break;
	      default:
	        player.pauseVideo();
	        this.isPlaying = false;
	        window.clearInterval(loop);
	        loop = false;
	      }
	};

	this.back = function() {
		player.seekTo(app.activeTrack.begin);
	};

	this.backBack = function() {
		//these are both awful and need to be re written
		app.activeTrack = app.activeTracks[app.activeTracks.indexOf(app.activeTrack) - 1];
		app.setTrack(app.activeTrack);
	};

	this.next = function() {
		// wow thats ugly
		app.activeTrack = app.activeTracks[app.activeTracks.indexOf(app.activeTrack) + 1];
		app.setTrack(app.activeTrack);
	};

	this.update = function() {
		app.progress = player.getCurrentTime() - app.activeTrack.begin;
		if (player.getCurrentTime() >= app.activeTrack.stop) {
			console.log("THATS ALL FOLKS");
			app.next();

		}
		$scope.$apply();
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

.controller('Uploader', function($scope, $http){
	$scope.uploadStep = 0;
	$scope.instructions = ["Enter the Youtube Video Id... (<a href='https://www.google.com/?ion=1&espv=2#q=find%20youtube%20video%20id' target=''>help</a>)",
						    "Now enter the name of the artist and the album...",
						    "Great! The audio should begin playing in a couple seconds. When you hear the end of one song, hit the + button to create a cut between two tracks, then enter the name of the track that just ended."];
	$scope.nextStep = function() {
		if ($scope.uploadStep < $scope.instructions.length - 1) {
			$scope.uploadStep++;
		}
	}
	$scope.resetUpload = function() {
		// reset everything
	}
	$scope.currentUpload = {
		artist: '',
		albumName: '',
		videoId: '',
		createdTracks: [],
		addTrack: function() {
			console.log("YOU RANG");
			var nextTrackNum = this.createdTracks.length + 1;
			this.createdTracks.push( new Track(nextTrackNum, '', this.albumName, this.artist, this.videoId) );
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

