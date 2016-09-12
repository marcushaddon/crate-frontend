crate.controller('FrontPageCtrl', function($scope, $location, clerk){
  $scope.latestAlbums    = [];
  $scope.latestPlaylists = [];

  $scope.init = function() {
    clerk.getLatestUploads(4,0).then(function(response){
      $scope.latestAlbums = response.data;
      console.log(response.data);
    });
  }
});
