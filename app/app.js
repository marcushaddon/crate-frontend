var crate = angular.module('main-app', ['ngRoute'])

.constant('config', config)

.config(function($routeProvider, $httpProvider){
	$httpProvider.interceptors.push('authInterceptor')

	$routeProvider.when('/login', {
		templateUrl: 'login/login.html',
		controller: 'login'
	})

	.when('/', {
		templateUrl: 'front-page/front-page.html',
		controller: 'FrontPageCtrl'
	})

	.when('/upload', {
		templateUrl: 'upload/upload.html',
		controller: 'Uploader'
	})

	.when('/upload/printout', {
		templateUrl: 'upload/printout.html',
		controller: 'Uploader'
	})

	.when('/upload/add-break-points', {
		templateUrl: 'upload/add-break-points.html',
		controller: 'trackEditCtrl'
	})

	.when('/search-results/:searchField', {
		templateUrl: 'search/search-results.html',
		controller: 'SearchCtrl'
	})

	.when('/album/:id', {
		templateUrl: 'album/view-album-full.html',
		controller: 'AlbumCtrl'
	})

	.when('/playlist/:id', {
		templateUrl: 'playlist/playlist.html',
		controller: 'playlistCtrl'
	})

	.when('/artist-profile/:id', {
		templateUrl: 'artist/artist-profile.html',
		controller: 'ArtistProfileCtrl'
	})

	.when('/user/:id', {
		templateUrl: 'user/user-profile.html',
		controller: 'userCtrl'
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
		templateUrl: 'nav-bar/nav-bar.html',
		// Needs its own controller, or... maybe not
		controller: 'navbarCtrl'
	};
})

.directive('player', function(){
	return {
		restrict: 'E',
		templateUrl: 'player/player.html',
		controller: 'PlayerCtrl'
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
		templateUrl: 'search/search.html',
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
		templateUrl: 'home/view-album.html'
	}
})

.directive('viewPlaylist', function(){
	return {
		templateUrl: 'home/view-playlist.html'
	}
})

.directive('bottomModal', function(){
	return {
		templateUrl: 'components/bottom-modal.html',
		controller: 'bottomModalCtrl'
	}
})

.directive('centermModal', function(){
	return {
		templateUrl: 'components/center-modal.html'
	}
})

.directive('songItem', function(){
	return {
		templateUrl: 'components/album-song-item.html',
		controller: 'trackCtrl'
	}
})

.directive('listSongItem', function(){
	return {
		templateUrl: 'components/list-song-item.html',
		controller: 'trackCtrl'
	}
})

.directive('playlistItem', function(){
	return {
		templateUrl: 'components/playlist-item.html'
	}
})

.directive('playlistSongItem', function(){
	return {
		templateUrl: 'components/playlist-song-item.html',
		controller: 'trackCtrl'
	}
})

.directive('albumItem', function(){
	return {
		templateUrl: 'components/album-item.html'
	}
})

.directive('albumTile', function(){
	return {
		templateUrl: 'components/album-tile.html',
		controller: 'albumTileCtrl'
	}
})

.directive('playlistTile', function(){
	return {
		templateUrl: 'components/playlist-tile.html',
		controller: 'albumTileCtrl'
	}
})

.directive('masterTile', function(){
	return {
		templateUrl: 'components/master-tile.html',
		controller: 'masterCtrl'
	}
})

.directive('artistChip', function(){
	return {
		templateUrl: 'components/artist-chip.html'
	}
})

.directive('artistItem', function(){
	return {
		templateUrl: 'components/artist-item.html'
	}
});
