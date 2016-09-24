crate.config(function($routeProvider, $httpProvider){
	$httpProvider.interceptors.push('authInterceptor')

	$routeProvider.when('/login', {
		templateUrl: 'login/login.html',
		controller: 'login'
	})

	.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'playlistCtrl'
	})

	.when('/front-page', {
		templateUrl: 'front-page/front-page.html',
		controller: 'FrontPageCtrl'
	})

	.when('/upload', {
		templateUrl: 'upload/upload.html',
		controller: 'Uploader'
	})

	.when('/search-results', {
		templateUrl: 'search/search-results.html',
		controller: 'SearchCtrl'
	})

	.when('/album/:id', {
		templateUrl: 'album/view-album-full.html',
		controller: 'AlbumCtrl'
	})

	.when('/artist-profile/:id', {
		templateUrl: 'artist/artist-profile.html',
		controller: 'ArtistProfileCtrl'
	});

});
