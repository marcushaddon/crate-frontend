crate.factory('trackFactory', function($http){
  return {
    incrementListens: function(trackId) {
      return $http({
        method: "PUT",
        url: "api/tracks/" + trackId + "/increment-listens"
      });
    },

    createTracks: function(tracks) {
      return $http({
        method: 'POST',
        url: '/api/tracks',
        data: tracks
      });
    },

    getTracksByArtistId: function(id) {
      return $http({
        method: 'GET',
        url: '/api/artist/' + id + '/tracks'
      });
    }
  }

});
