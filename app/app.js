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

	.when('/artist-profile/:id', {
		templateUrl: 'components/artist-profile.html',
		controller: 'ArtistProfileCtrl'
	});

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
		controller: 'Main',
		controllerAs: 'MainCtrl'
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
})

.directive('viewAlbum', function(){
	return {
		templateUrl: 'components/view-album.html'
	}
})

.directive('viewPlaylist', function(){
	return {
		templateUrl: 'components/view-playlist.html'
	}
})

.directive('songItem', function(){
	return {
		templateUrl: 'components/song-item.html'
	}
})

.directive('listSongItem', function(){
	return {
		templateUrl: 'components/list-song-item.html'
	}
})

.directive('playlistItem', function(){
	return {
		templateUrl: 'components/playlist-item.html'
	}
})

.directive('albumItem', function(){
	return {
		templateUrl: 'components/album-item.html'
	}
})

.directive('artistItem', function(){
	return {
		templateUrl: 'components/artist-item.html'
	}
});
