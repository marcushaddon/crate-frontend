crate.controller('FrontPageCtrl', function($scope, $location, clerk){
  $scope.latestAlbums    = [];
  $scope.latestPlaylists = [];
  $scope.today = new Date();

  $scope.init = function() {
    clerk.getLatestUploads(4,0).then(function(response){
      $scope.latestAlbums = response.data;
      console.log(response.data);
    });

    clerk.getLatestPlaylists(4, 0).then(function(response){
      $scope.latestPlaylists = response.data;
      console.log(response.data);
    })
  }
});
