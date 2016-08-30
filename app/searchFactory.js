crate.factory('SearchFactory', function($rootScope, $location, clerk){
  return {
    results: [],
    search: function(searchField) {
      clerk.search(searchField, function(response){
        this.results = response.data;
        $rootScope.$broadcast('resultsAreIn', response.data);
      }, function(){
        console.log("The search failed!");
      });
    }
  };
});
