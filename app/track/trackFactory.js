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

    createPendingTracks: function(pendingTracks) {
      return $http({
        method: 'POST',
        url: '/api/tracks/pending',
        data: pendingTracks
      });
    },

    getPendingTracksByAlbumId: function(albumId) {
      return $http({
        method: 'GET',
        url: '/api/tracks/pending/' + albumId
      });
    },

    updatePendingTracks: function(pendingTracks) {
      return $http({
        method: 'PUT',
        url: '/api/tracks/pending',
        data: pendingTracks
      });
    },

    getTracksByArtistId: function(id) {
      return $http({
        method: 'GET',
        url: '/api/artist/' + id + '/tracks'
      });
    },

    sortTracksByTrackNos: function(tracks) {
      return tracks.sort(function(a, b) {
        if (a.trackNum > b.trackNum) return 1;
        if (a.trackNum < b.trackNum) return -1;
        return 0;
      });
    }
  }

});
