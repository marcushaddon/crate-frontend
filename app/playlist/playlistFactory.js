crate.factory('playlistFactory', function($http){
  // put clerks playlist methods in here
  return {
    capturedTrack: {},

    getUserPlaylists: function(id) {
      return $http({
        method: 'GET',
        url: '/api/user/' + id + '/playlists'
      });
    },

    createPlaylist: function() {
      return $http({
        method: 'POST',
        url: '/api/playlists/new'
      });
    },

    saveAlbumAsPlaylist: function(album) {
      return $http({
        method: 'POST',
        url: '/api/playlists/saveAlbumAsPlaylist/' + album._id
      });
    },

    editPlaylist: function(playlist, field, value) {
      return $http({
        method: 'PUT',
        url: '/api/playlists/' + playlist._id,
        data: {
          editField: field,
          newValue: value
        }
      });
    },

    deletePlaylist: function(id) {
      return $http({
        method: 'DELETE',
        url: '/api/playlists/' + id
      });
    }

  };
});
