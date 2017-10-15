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

    getLatestAlbums: function(pageSize, page) {
      return $http({
        method: 'GET',
        url: '/api/album?sort_by=foundOn&sort_order=desc&page_size=' + pageSize + '&page=' + page
      });
    },

    getTopAlbums: function(pageSize, page) {
      return $http({
        method: 'GET',
        url: '/api/album?sort_by=listens&page_size=' + pageSize + '&page=' + page
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
        url: '/api/user/' + id + '/albums?page_size=' + pageSize + "&page=" + page + "&sort_by=" + sortBy + "&sort_order=" + order
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
    },

    deleteAlbum: function(album) {
      return $http({
        method: 'DELETE',
        url: '/api/album/' + album._id
      });
    }
  };
});
