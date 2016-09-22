crate.factory('artistFactory', function($http){
  return {
    getArtist: function(id) {
      return $http({
        method: 'GET',
        url: '/api/artist/' + id
      })
    }
  }
});
