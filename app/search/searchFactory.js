crate.factory('SearchFactory', function($rootScope, $location, clerk){
  return {
    results: [],
    search: function(searchField) {
      clerk.search(searchField)
      .then(function(response){
        $rootScope.$broadcast('resultsAreIn', response.data);
      });
    }
  };
});
