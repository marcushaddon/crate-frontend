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

    saveAlbumAsPlaylist: function(album, tracks) {
      console.log(album.imgUrl);
      var albumPlaylist = {
        listType: 'playlist',
        name: album.artist + ' - ' + album.name,
        description: '',
        imgUrl: album.imgUrl,
        tags: album.tags,
        favorites: 0,
        listens: 0,
        tracks: tracks
      };
      return $http({
        method: 'POST',
        url: '/api/playlists',
        data: albumPlaylist
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
