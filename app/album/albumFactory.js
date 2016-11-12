crate.factory('albumFactory', function($http, $q){
  return {

    getAlbum: function(id) {
      return $http({
        method: 'GET',
        url: '/api/album/' + id
      });
    },

    getAlbumByDiscogsId: function(id) {
      return $http({
        method: 'GET',
        url: '/api/album/discogs/' + id
      });
    },

    getTracksByAlbumId: function(id) {
        return $http({
          method: 'GET',
          url: '/api/album/' + id + '/tracks'
        });
    },

    getLatestAlbums: function(count, offset) {
      var count = count;
  		var offset = offset || 0;
      return $http({
        method: 'GET',
        url: '/api/album/latest/' + count + '/' + offset
      });
    },

    getAlbumsByUserId: function(id) {
      return $http({
        method: 'GET',
        url: '/api/user/' + id + '/albums'
      });
    },

    getAlbumsByArtistId: function(id) {
      return $http({
        method: 'GET',
        url: '/api/artist/' + id + '/albums'
      });
    },

    createAlbum: function(album) {
      return $http({
        method: 'POST',
        url: '/api/album',
        data: album
      });
    },

    incrementListens: function(albumId) {
      return $http({
        method: "PUT",
        url: "api/album/" + albumId + "/increment-listens"
      });
    }
  };
});
