crate.service('clerk', function($http, $rootScope, user){
	clerk = this;
	this.user = {};
	this.searchResults = [];
	this.getSearchResults = function() { console.log("I AM THE CLERK AND I HAVE " + this.searchResults); return this.searchResults;  };
	this.fetchMe = function(endPoint, method, data) {
		return $http({
							method: method,
							url: endPoint,
							data: data
						});
	};

	this.getTracksByAlbumId = function(albumId) {
		return this.fetchMe('/api/tracks/albumId/' + albumId, 'GET', null);
	};

	this.getPlayLists = function() {
		return this.fetchMe('/api/playlists', 'GET', null)
	};

	this.createList = function(album) {
		return this.fetchMe('/api/playlists/new', 'POST', album);
	};

	this.deleteList = function(list) {
		return this.fetchMe('/api/playlists/' + list._id, 'DELETE', null);
	};

	this.editList = function(list, field, value) {
		var data = {
			playlistId: list._id,
			editField: field,
			newValue: value
		};
		return this.fetchMe('/api/playlists/edit', 'PUT', data);
	};

	this.saveAlbum = function(album) {
		return this.fetchMe('/api/playlists/saveAlbum', 'POST', album);
	};

	this.uploadAlbum = function(album) {
		return this.fetchMe('/api/upload', 'POST', album);
	};

	this.logIn = function(userName, password) {
		return this.fetchMe('/login', 'POST', { userName : userName, password: password });
	};

	this.search = function(searchField) {
		// This should broadcast from searchFactory to stay consistent i think?
		return this.fetchMe('/api/search/' + searchField, 'GET', {});
	};

	this.getArtist = function(artistId) {
		return this.fetchMe('/api/artist/artistId/' + artistId, 'GET', {});
	};

	this.getLatestUploads = function(count, offset) {
		var count = count;
		var offset = offset || 0;
		return this.fetchMe('/api/latestUploads/' + count + '/' + offset, 'GET', {});
	};

	this.getLatestPlaylists = function(count, offset) {
		var count = count;
		var offset = offset || 0;
		return this.fetchMe('/api/latestPlaylists/' + count + '/' + offset, 'GET', {});
	};

	this.getAlbum = function(albumId) {
		return this.fetchMe('/api/album/id/' + albumId, 'GET', {});
	}
 }
)
