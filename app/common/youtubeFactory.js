crate.factory('youtubeFactory', function($http){
  return {
    getVideoInfo: function(id) {
      return $http({
        method: 'GET',
        url: '/api/youtube/videoDescription/' + id
      });
    },

    getVideoDuration: function(id) {
      return $http({
        method: 'GET',
        url: '/api/youtube/videoDuration/' + id
      });
    },

    
  };
});
