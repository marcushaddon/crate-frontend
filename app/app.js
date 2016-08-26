var crate = angular.module('main-app', ['ngRoute'])

.config(function($routeProvider){
	$routeProvider.when('/login', {
		templateUrl: 'components/login.html',
		controller: 'login'
	})

	.when('/home', {
		templateUrl: 'components/home.html'
	})

	.when('/upload', {
		templateUrl: 'components/upload.html',
		controller: 'Uploader'
	})

	.when('/search-results', {
		templateUrl: 'components/search-results.html',
		controller: 'SearchCtrl'
	})
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
		controller: function($location){},
		controllerAs: 'navBar'
	};
})

.directive('player', function(){
	return {
		restrict: 'E',
		templateUrl: 'components/player.html',
		controller: 'Main'
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
})

.directive('search', function(){
	return {
		restrict: 'E',
		templateUrl: 'components/search.html',
		controller: 'SearchCtrl'
	}
})

.directive('searchResults', function(){
	return {
		templateUrl: 'components/search-results.html',
		controller: 'SearchCtrl'
	}
});
