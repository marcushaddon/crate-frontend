crate.factory('trackFactory', function($http){
  recordListen: function(track) {
    return $http({
      method:"PUT",
      url: "/api/track/" + track._id + "/increment-count/"
    });
  }
});
