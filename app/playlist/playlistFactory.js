crate.factory('playlistFactory', function($http, user){
  // put clerks playlist methods in here
  return {
    capturedTrack: {},

    getPlaylist: function(id) {
      return $http({
        method: 'GET',
        url: '/api/playlists/' + id
      });
    },

    getUserPlaylists: function(id) {
      return $http({
        method: 'GET',
        url: '/api/user/' + id + '/playlists'
      });
    },



    getLatestPlaylists: function(count, offset) {
      var count = count || 0;
      var offset = offset || 0;
      return $http({
        method: 'GET',
        url: '/api/playlists/latest/' + count + '/' + offset
      });
    },

    createPlaylist: function(playlist) {
      return $http({
        method: 'POST',
        url: '/api/playlists',
        data: playlist
      });
    },

    saveAlbumAsPlaylist: function(album) {
      return $http({
        method: 'POST',
        url: '/api/playlists/saveAlbumAsPlaylist/' + album._id
      });
    },

    editPlaylist: function(playlist) {
      return $http({
        method: 'PUT',
        url: '/api/playlists/' + playlist._id,
        data: playlist
      });
    },

    deletePlaylist: function(id) {
      return $http({
        method: 'DELETE',
        url: '/api/playlists/' + id
      });
    },

    incrementListens: function(playlistId) {
      return $http({
        method: "PUT",
        url: "api/playlists/" + playlistId + "/increment-listens"
      });
    }

  };
});
