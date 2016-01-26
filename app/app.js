(function(){

angular.module('main-app', [])

.controller('Player', function(){
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
		this.progress = 0;
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
	};

	this.progress = 0;

	this.isPlaying = false;
	



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

