crate.factory('artistFactory', function($http){
  return {
    getArtist: function(id) {
      return $http({
        method: 'GET',
        url: '/api/artist/' + id
      })
    },

    incrementListens: function(artistId) {
      return $http({
        method: "PUT",
        url: "api/artists/" + artistId + "/increment-listens"
      });
    }
  }
});
