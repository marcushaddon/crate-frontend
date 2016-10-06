crate.factory('albumFactory', function($http, $q){
  return {

    getAlbum: function(id) {
      return $http({
        method: 'GET',
        url: '/api/album/' + id
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
    }
  };
});
