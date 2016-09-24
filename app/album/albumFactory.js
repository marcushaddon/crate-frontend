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
    }
  };
});
