crate.factory('albumFactory', function($http){
  return {
    getAlbum: function(id) {
      return $http({
        method: 'GET',
        url: '/api/album/' + id
      })
    }
  };
});
