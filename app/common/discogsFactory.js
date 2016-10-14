crate.factory('discogsFactory', function($http){
  return {
    searchForRelease: function(query) {
      return $http({
        method: 'GET',
        url: '/api/discogs/search/master/' + query
      });
    },

    searchForArtist: function(query) {
      return $http({
        method: 'GET',
        url: '/api/discogs/search/artist/' + query
      });
    },

    // getMaster: function(id) {
    //   return $http({
    //     method: 'GET',
    //     url: '/api/discogs/master/' + id
    //   });
    // },
    //
    // getRelease: function(id) {
    //   return $http({
    //     method: 'GET',
    //     url: '/api/discogs/release/' + id
    //   });
    // },

    getAlbum: function(id, type) {
      return $http({
        method: 'GET',
        url: '/api/discogs/' + type + '/' + id
      });
    },

    getArtist: function(id) {
      return $http({
        method: 'GET',
        url: '/api/discogs/artist/' + id
      });
    },

    getArtistReleases: function(id) {
      return $http({
        method: 'GET',
        url: '/api/discogs/artist/'+ id + '/releases'
      });
    }


  };
});
