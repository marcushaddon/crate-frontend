crate.service('clerk', function($http, user){
	this.fetchMe = function(endPoint, method, data, successCallBack, failureCallBack) {
		$http({
			method: method,
			url: endPoint,
			data: data,
			headers: { 'api-key': user.api_key } // This will be from probably a user factory
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

	this.uploadAlbum = function(album, successCallBack, failureCallBack) {
		this.fetchMe('/api/upload', 'POST', album, successCallBack, failureCallBack);
	}

	this.logIn = function(userName, password, successCallBack, failureCallBack) {
		this.fetchMe('/login', 'POST', { userName : userName, password: password }, successCallBack, failureCallBack);
	}
 }
)