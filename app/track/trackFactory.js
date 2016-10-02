crate.factory('trackFactory', function($http){
  return {
    recordListen: function(track) {
      return $http({
        method:"PUT",
        url: "/api/track/" + track._id + "/increment-count/"
      });
    }
  }

});
