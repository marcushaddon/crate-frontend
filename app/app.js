(function(){

var app = angular.module('main-app', []);



app.directive('currentPlaylist', function(){
	return {
		restrict: 'E',
		templateUrl: 'components/current-playlist.html',
		controller: function(){
				this.tracks = plantasiaTracks;

				this.secToMinSec = function(seconds) {
					var wholeSecs = Math.floor(seconds);
					var secs = (wholeSecs % 60);
					var minutes = (wholeSecs - secs) / 60;
					var readOut = minutes + ":" + secs;
					return readOut;
				};
			},
			controllerAs: 'playlist'
	};
});

app.directive('savedPlaylists', function(){
	return {
		restrict: 'E',
		templateUrl: 'components/saved-playlists.html',
		controller: function() {
			this.lists = [{artistName: 'Mort Garson', albumName: 'Plantasia', tracks: plantasiaTracks},
				 {artistName: 'Takeshi Taruchi', albumName: "Let's Go Classics!", tracks: null},
				 {artistName: 'Yasuaki Shimizu', albumName:'Kakashi', tracks: kakashiTracks}
			];
		},
		controllerAs: 'savedLists'
	};
});

app.directive('navBar', function(){
	return {
		restrict: 'E',
		templateUrl: 'components/nav-bar.html',
		controller: function(){},
		controllerAs: 'navBar'
	};
});

app.directive('player', function(){
	return {
		restrict: 'E',
		templateUrl: 'components/player.html',
		controller: function(){},
		controllerAs: 'player'
	};
});

})();

