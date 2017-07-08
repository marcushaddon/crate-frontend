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



    getLatestPlaylists: function(page_size, page) {
      return $http({
        method: 'GET',
        url: '/api/playlists?sort_by=dateCreated&sort_order=desc&page_size=' + page_size + '&page=' + page 
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
        description: 'A playlist by ' + user.info.userName,
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
        url: "/api/playlists/" + playlistId + "/increment-listens"
      });
    }

  };
});
