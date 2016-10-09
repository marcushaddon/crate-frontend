crate.factory('uploadFactory', function($http, discogsFactory, artistFactory, albumFactory){
  return {
    checkCrateForArtist: function(artist) {
      return $http({
        method: 'GET',
        url: '/api/search/artist/' + artist
      });
    },

    useDiscogsMaster: function(master) {
      discogsFactory.getMaster(master.id)
      .then(function(response){
        var discogsArtistId = response.data.artists[0].id;
        // See if we already have this artist
        artistFactory.getArtistByDiscogsId(discogsArtistId)
        .then(function(response){
          // We have this artist!
          if (response.data != null && response.data != []) {
            this.artistCandidate = response.data;
          } else {
            // We dont have this artist, so create them and assign the result to our artistCandidate
          }
        })
      });
    },

    artist: {},
    album: {},
    tracks: []
  }
});
