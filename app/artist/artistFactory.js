crate.factory('artistFactory', function($http){
  return {
    getArtist: function(id) {
      return $http({
        method: 'GET',
        url: '/api/artist/' + id
      })
    },


    getArtistByDiscogsId: function(id) {
      return $http({
        method: 'GET',
        url: '/api/discogsArtist/' + id
      });
    },

    createArtist: function(artist) {
      // Creating an artist with our forthcoming RESTful artist POST endpoint!
      return $http({
        method: 'POST',
        url: '/api/artists',
        data: artist
      });
    },

    incrementListens: function(artistId) {
      return $http({
        method: "PUT",
        url: "api/artists/" + artistId + "/increment-listens"
      });
    }
}

});
