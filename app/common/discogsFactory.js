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
        url: 'https://api.discogs.com/masters/' + id
      });
    },

    getArtist: function(id) {
      return $http({
        method: 'GET',
        url: 'https://api.discogs.com/artists/' + id
      });
    }


  };
});
