crate.factory('trackFactory', function($http){
  return {
    incrementListens: function(track) {
      return $http({
        method: "PUT",
        url: "/api/tracks/" + track._id + "/increment-listens",
        data: track
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
