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

		getCrateArtists: function(pageSize, page) {
			pageSize = pageSize || 30;
			page = page || 1;
			return $http({
				method: 'GET',
				url: '/api/user/' + this.info.userId + '/crate/artists?page=' + page + '&pageSize=' + pageSize
			});
		},

		getCrateAlbums: function(pageSize, page) {
			pageSize = pageSize || 30;
			page = page || 1;
			return $http({
				method: 'GET',
				url: '/api/user/' + this.info.userId + '/crate/albums?page=' + page + '&pageSize=' + pageSize
			});
		},

		getCrateTracks: function(pageSize, page) {
			pageSize = pageSize || 30;
			page = page || 1;
			return $http({
				method: 'GET',
				url: '/api/user/' + this.info.userId + '/crate/tracks?page=' + page + '&pageSize=' + pageSize
			});
		},

		getCratePlaylists: function(pageSize, page) {
			pageSize = pageSize || 30;
			page = page || 1;
			return $http({
				method: 'GET',
				url: '/api/user/' + this.info.userId + '/crate/playlists?page=' + page + '&pageSize=' + pageSize
			});
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
