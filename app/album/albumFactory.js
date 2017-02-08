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

    getAlbumsByUserId: function(id, pageSize, page, sortBy, order) {
      pageSize = pageSize || 10;
      page     = page || 1;
      sortBy   = sortBy || 'foundOn';
      order    = order || 'asc';
      return $http({
        method: 'GET',
        // IS THIS RESTFUUUUUUUUULLLLL
        url: '/api/user/' + id + '/albums?pageSize=' + pageSize + "&page=" + page + "&sortBy=" + sortBy + "&order=" + order
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

    maybeCreateAlbum: function(album) {
      return $http({
        method: 'PUT',
        url: '/api/album',
        data: album
      });
    },

    incrementListens: function(albumId) {
      return $http({
        method: "PUT",
        url: "/api/album/" + albumId + "/increment-listens"
      });
    }
  };
});
