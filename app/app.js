var crate = angular.module('main-app', ['ngRoute', 'ui.router'])

.constant('config', {
	albumImgPlaceHolder: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=album+cover&w=300&h=300',
	userImgPlaceholder: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=user&w=350&h=150'
})

.config(function($stateProvider, $httpProvider, $urlRouterProvider){
	$httpProvider.interceptors.push('authInterceptor')



	$stateProvider.state('crate', {
		url: '',
		abstract: true
	})

	.state('crate.login', {
		url: '/login',
		views: {
			'login@': {
				templateUrl: 'login/login.html',
				controller: 'login'
			}
		}
	})

	.state('crate.frontPage', {
		url: '/',
		views: {
			'frontPage@' : {
				templateUrl: 'front-page/front-page.html',
				controller: 'FrontPageCtrl'
			}
		}
	})

	.state('crate.myMusic', {
		url: '/my-music',
		views: {
			'frontPage@' : {
				templateUrl: 'home/home.html',
				controller: 'myMusicCtrl'
			}
		}
	})

	.state('crate.searchResults', {
		url: '/search-results/:searchField',
		views: {
			'searchResults@': {
				templateUrl: 'search/search-results.html',
				controller: 'SearchCtrl'
			}
		}
	})

	.state('crate.userProfile', {
		url: '/user/:id',
		views: {
			'userProfile@': {
				templateUrl: 'user/user-profile.html',
				controller: 'userCtrl'
			}
		}

	})

	.state('crate.artistProfile', {
		url: '/artist-profile/:id',
		views: {
			'artistProfile@': {
				templateUrl: 'artist/artist-profile.html',
				controller: 'ArtistProfileCtrl'
			}
		}

	})

	.state('crate.album', {
		url: '/album/:id',
		views: {
			'album@': {
				templateUrl: 'album/view-album-full.html',
				controller: 'AlbumCtrl'
			}
		}

	})

	.state('playlist', {
		url: '/playlist/:id',
		views: {
			'playlist@': {
				templateUrl: 'playlist/playlist.html',
				controller: 'playlistCtrl'
			}
		}

	})

	.state('crate.upload', {
		url: '/upload',
		views: {
			'upload@': {
				templateUrl: 'upload/upload.html',
				controller: 'Uploader'
			}
		}
	});

	$urlRouterProvider.otherwise('/');

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
		controller: 'playlistCtrl'
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
		templateUrl: 'components/album-tile.html'
	}
})

.directive('playlistTile', function(){
	return {
		templateUrl: 'components/playlist-tile.html'
	}
})

.directive('artistItem', function(){
	return {
		templateUrl: 'components/artist-item.html'
	}
});
