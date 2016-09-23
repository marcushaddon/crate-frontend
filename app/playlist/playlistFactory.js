crate.factory('playlistFactory', function($http){
  // put clerks playlist methods in here
  console.log("I AM THE NEXT PLAYLIST FACOTRY");
  return {
    getUserPlaylists: function(id) {
      return $http({
        method: 'GET',
        url: '/api/user/' + id + '/playlists'
      });
    },

    createPlaylist: function() {
      console.log("MAKIN LIST THE FACOTRY WAY");
      return $http({
        method: 'POST',
        url: '/api/playlists/new'
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
