crate.factory('trackFactory', function($http){
  return {
    incrementListens: function(trackId) {
      return $http({
        method: "PUT",
        url: "api/tracks/" + trackId + "/increment-listens"
      });
    }
  }

});
