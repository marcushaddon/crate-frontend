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
        url: '/api/artist/discogs/' + id
      });
    },

    createArtist: function(artist) {
      //WHATS GOIN ON
      // Creating an artist with our forthcoming RESTful artist POST endpoint!
      return $http({
        method: 'POST',
        url: '/api/artist',
        data: artist
      });
    },

    incrementListens: function(artistId) {
      return $http({
        method: "PUT",
        url: "api/artist/" + artistId + "/increment-listens"
      });
    }
}

});
