crate.factory('user', function($rootScope, $http, $location, authTokenFactory) {
	return {
		user: this,
		info: {},
		isLoggedIn: function() {
			return this.info.userId !== undefined;
		},

		setUser: function(userData) {
			this.info = userData;
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

		logOut: function() {
			this.setUser({});
			// More stuff here

		},

		crateViewParams: {
			artists: {
				pageSize: 10,
				page: 1,
				sortBy: 'dateAdded',
				sort: 'asc'
			},
			albums: {
				pageSize: 10,
				page: 1,
				sortBy: 'dateAdded',
				sort: 'asc'
			},
			tracks: {
				pageSize: 20,
				page: 1,
				sortBy: 'dateAdded',
				sort: 'asc'
			},
			playlists: {
				pageSize: 10,
				page: 1,
				sortBy: 'dateAdded',
				sort: 'asc'
			}
		},

		getCrateViewParam: function(view, param) {
			return this.crateViewParams[view][param];
		},

		setCrateViewParam: function(view, param, value) {
			this.crateViewParams[view][param] = value;
		},

		getCrateArtists: function(user, pageSize, page, sortBy, order) {
			pageSize = pageSize || 30;
			page     = page     || 1;
			sortBy   = sortBy   || 'dateAdded';
			order    = order    || 'asc';
			return $http({
				method: 'GET',
				url: '/api/user/' + user._id + '/crate/artists?page=' + page + '&pageSize=' + pageSize
			});
		},

		getCrateAlbums: function(user, pageSize, page, sortBy, order) {
			pageSize = pageSize || 30;
			page     = page     || 1;
			sortBy   = sortBy   || 'dateAdded';
			order    = order    || 'asc';
			return $http({
				method: 'GET',
				url: '/api/user/' + user._id + '/crate/albums?page=' + page + '&pageSize=' + pageSize + " &sortBy=" + sortBy + "&order=" + order
			});
		},

		getCrateTracks: function(user, pageSize, page, sortBy, order) {
			pageSize = pageSize || 30;
			page     = page     || 1;
			sortBy   = sortBy   || 'dateAdded';
			order    = order    || 'asc';
			return $http({
				method: 'GET',
				url: '/api/user/' + user._id + '/crate/tracks?page=' + page + '&pageSize=' + pageSize + " &sortBy=" + sortBy + "&order=" + order
			});
		},

		getCratePlaylists: function(user, pageSize, page, sortBy, order) {
			pageSize = pageSize || 30;
			page     = page     || 1;
			sortBy   = sortBy   || 'dateAdded';
			order    = order    || 'asc';
			return $http({
				method: 'GET',
				url: '/api/user/' + user._id + '/crate/playlists?page=' + page + '&pageSize=' + pageSize + " &sortBy=" + sortBy + "&order=" + order
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
