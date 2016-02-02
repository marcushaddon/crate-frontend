(function(){

angular.module('main-app', [])

.controller('Player', function($scope){
	app = this;
	this.lists = playlists;
	this.viewList = this.lists[0];
	this.viewTracks = function() { return this.viewList.tracks; };
	this.activeList = this.lists[0];
	this.activeTracks = function() { return this.activeList.tracks; };
	this.activeTrack = this.activeTracks()[0];

	this.setActiveList = function(list) {
		this.activeList = list;
	};

	this.setViewList = function(list) {
		this.viewList = list;
	};

	this.setTrack = function(track) {
		this.activeTrack = track;
		if (this.activeTracks().indexOf(this.activeTrack) == -1) {
			this.activeList = this.viewList;
		}
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

	this.isViewList = function(list) {
		if (app.viewList == list) {
			return true;
		} else {
			return false;
		}
	};

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
		app.activeTrack = app.activeTracks()[app.activeTracks().indexOf(app.activeTrack) - 1];
		app.setTrack(app.activeTrack);
	};

	this.next = function() {
		//wow thats ugly
		app.activeTrack = app.activeTracks()[app.activeTracks().indexOf(app.activeTrack) + 1];
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

