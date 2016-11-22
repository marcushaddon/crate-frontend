crate.factory('user', function($rootScope, $http, $location, authTokenFactory) {
	return {
		user: this,
		info: {},
		isLoggedIn: function() {
			return authTokenFactory.getToken() !== null;
		},

		setUser: function(userData) {
			this.info = userData;
			this.loggedIn = true;
		},

		refreshUser: function() {
			return $http({
							method: 'POST',
							url: '/api/user/whoAmI'
						});
		},

		getUser: function(id) {
			return $http({
				method: 'GET',
				url: '/api/user/' + id
			});
		},

		logIn: function(userName, password) {
			return $http({
				method: 'POST',
				url: '/login',
				data: {
					userName: userName,
					password: password
				}
			});
			// Need failure function
		},

		logOut: function() {
			authTokenFactory.setToken();
			this.setUser({});
			// More stuff here

		},

		toggleCrateArtist: function(artist) {
			return $http({
				method: 'PUT',
				url: '/api/user/' + this.info.userId + '/crate/artist',
				data: artist
			});
		},

		toggleCrateAlbum: function(album) {
			return $http({
				method: 'PUT',
				url: '/api/user/' + this.info.userId + '/crate/album',
				data: album
			});
		},

		toggleCrateTrack: function(track) {
			return $http({
				method: 'PUT',
				url: '/api/user/' + this.info.userId + '/crate/track',
				data: track
			});
		},

		toggleCratePlaylist: function(playlist) {
			return $http({
				method: 'PUT',
				url: '/api/user/' + this.info.userId + '/crate/playlist',
				data: playlist
			});
		}
	}
});
