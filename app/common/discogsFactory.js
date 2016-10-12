crate.factory('discogsFactory', function($http){
  return {
    searchForRelease: function(query) {
      return $http({
        method: 'GET',
        url: '/api/discogs/search/master/' + query
      });
    },

    getMaster: function(id) {
      return $http({
        method: 'GET',
        url: '/api/discogs/master/' + id
      });
    },

    getArtist: function(id) {
      return $http({
        method: 'GET',
        url: '/api/discogs/artist/' + id
      });
    }


  };
});
