(function(){

angular.module('main-app', [])

.controller('Player', function($scope){
	app = this;
	this.lists = playlists;
	this.currentList = this.lists[0];
	this.tracks = function() { return this.currentList.tracks; };
	this.currentTrack = this.tracks()[0];

	this.setList = function(list) {
		this.currentList = list;
	};

	this.setTrack = function(track) {
		this.currentTrack = track;
		player.loadVideoById({ videoId: app.currentTrack.videoId, startSeconds: app.currentTrack.begin });
		this.isPlaying = true;
		if (!loop) {
	      loop = setInterval(this.update, 1000);
	    }


	};

	this.isCurrentList = function(list) {
		if (app.currentList == list) {
			return true;
		} else {
			return false;
		}
	};

	this.isCurrentTrack = function(track) {
		if (app.currentTrack == track) {
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
		player.seekTo(app.currentTrack.begin);
	};

	this.backBack = function() {
		//these are both awful and need to be re written
		app.currentTrack = app.tracks()[app.tracks().indexOf(app.currentTrack) - 1];
		app.setTrack(app.currentTrack);
	};

	this.next = function() {
		//wow thats ugly
		app.currentTrack = app.tracks()[app.tracks().indexOf(app.currentTrack) + 1];
		app.setTrack(app.currentTrack);
	};

	this.update = function() {
		app.progress = player.getCurrentTime() - app.currentTrack.begin;
		if (player.getCurrentTime() >= app.currentTrack.stop) {
			console.log("THATS ALL FOLKS");
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
});


})();

