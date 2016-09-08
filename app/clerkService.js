crate.service('clerk', function($http, $rootScope, user){
	clerk = this;
	this.user = {};
	this.searchResults = [];
	this.getSearchResults = function() { console.log("I AM THE CLERK AND I HAVE " + this.searchResults); return this.searchResults;  };
	this.setUser = function(user) { this.user = user; };
	this.fetchMe = function(endPoint, method, data, successCallBack, failureCallBack) {
		$http({
			method: method,
			url: endPoint,
			data: data,
			headers: { 'api-key': clerk.user.api_key } // This will be from probably a user factory
		})
		.then(function(response) {
			successCallBack(response);
			},
			  function(response) {
			  	failureCallBack(response);
			  });
	};

	this.getTracksByAlbumId = function(albumId, successCallBack, failureCallBack) {
		this.fetchMe('/api/tracks/albumId/' + albumId, 'GET', null, successCallBack, failureCallBack);
	};

	this.getPlayLists = function(successCallBack, failureCallBack) {
		this.fetchMe('/api/playlists', 'GET', null, successCallBack, failureCallBack)
	};

	this.createList = function(album, successCallBack, failureCallBack) {
		this.fetchMe('/api/playlists/new', 'POST', album, successCallBack, failureCallBack);
	};

	this.deleteList = function(list, successCallBack, failureCallBack) {
		console.log(list);
		var payload = { testThing: "fuckValue" };
		this.fetchMe('/api/playlists/' + list._id, 'DELETE', null, successCallBack, failureCallBack);
	};

	this.editList = function(list, field, value, successCallBack, failureCallBack) {
		var data = {
			playlistId: list._id,
			editField: field,
			newValue: value
		};
		this.fetchMe('/api/playlists/edit', 'PUT', data, successCallBack, failureCallBack);
	};

	this.saveAlbum = function(album, successCallBack, failureCallBack) {
		this.fetchMe('/api/playlists/saveAlbum', 'POST', album, successCallBack, failureCallBack);
	};

	this.uploadAlbum = function(album, successCallBack, failureCallBack) {
		this.fetchMe('/api/upload', 'POST', album, successCallBack, failureCallBack);
	};

	this.logIn = function(userName, password, successCallBack, failureCallBack) {
		this.fetchMe('/login', 'POST', { userName : userName, password: password }, successCallBack, failureCallBack);
	};

	this.search = function(searchField, failureCallBack) {
		// This should broadcast from searchFactory to stay consistent i think?
		this.fetchMe('/api/search/' + searchField, 'GET', {}, function(response){ $rootScope.$broadcast('resultsAreIn', response.data);}, failureCallBack);
	};

	this.getArtist = function(artistId, successCallBack, failureCallBack) {
		this.fetchMe('/api/artist/artistId/' + artistId, 'GET', {}, successCallBack, failureCallBack);
	};
 }
)
