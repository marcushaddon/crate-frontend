crate.controller('SearchCtrl', function($scope, $location, clerk, stereo){
  $scope.searchField = '';
  $scope.results = {
    tracks: [{"_id":"57bd05db41a36fe117aa16c2","trackNum":1,"trackName":"Plantasia","albumName":"Plantasia","albumId":"57bd05db41a36fe117aa16c1","artist":"Mort Garson","videoId":"IUVmcKcTZ4A","begin":0,"stop":196.90070619836425,"__v":0}]
  };

  $scope.search = function(searchField) {

    clerk.search($scope.searchField, function(response){
      $scope.results = response.data;
      console.log(response.data);
      $location.path('/search-results');
    });
  }

  $scope.testThing = function(){
    console.log($scope.searchField);
  }
});
