crate.factory('tagFactory', function($http) {
  return {
    getTopTags: function(page, pageSize) {
      page = page || 1;
      pageSize = pageSize || 10;

      return $http({
        method: 'GET',
        url: '/api/search/tag?page=' + page + '&pageSize=' + pageSize
      });
    }
  };
});
