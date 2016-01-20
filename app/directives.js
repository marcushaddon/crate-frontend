(function(){

angular.module('main-app', [])

.controller('Player', function($scope){
	var app = $scope;
	$scope.lists = playlists;
	$scope.selected = 0;
	$scope.select = function(number){app.selected = parseInt(number);};
	$scope.currentList = $scope.lists[$scope.selected].tracks;

	$scope.currentTime = 0;
	$scope.trackLength = 50;
	


	//better implemented as a custom filter
	$scope.secToMinSec = function(seconds) {
					var wholeSecs = Math.floor(seconds);
					var secs = (wholeSecs % 60);
					var minutes = (wholeSecs - secs) / 60;
					var readOut = minutes + ":" + secs;
					return readOut;
				};

})

.directive('savedPlaylists', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'components/saved-playlists.html',
		controller: 'Player',
		controllerAs: 'PlayerCtrl'
	};
})

.directive('currentPlaylist', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'components/current-playlist.html',
		controller: 'Player',
			controllerAs: 'PlayerCtrl'
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
		replace: true,
		templateUrl: 'components/player.html',
		controller: 'Player',
		controllerAs: 'player'
	};
});

})();

