crate.controller('AlbumCtrl', function($scope, $location, $routeParams, clerk){
  $scope.init = function() {

    var albumId = $routeParams.id;
    console.log(albumId);
    clerk.getAlbum(albumId)
    .then(function(response){
      $scope.album = response.data.album;
      $scope.tracks = response.data.tracks;
    });
  };

  

});
