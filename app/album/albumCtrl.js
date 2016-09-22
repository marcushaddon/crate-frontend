crate.controller('AlbumCtrl', function($scope, $location, $routeParams, messenger, albumFactory, clerk){
  $scope.init = function() {

    var albumId = $routeParams.id;
    console.log(albumId);
    albumFactory.getAlbum(albumId)
    .then(function(response){
      $scope.album = response.data.album;
      $scope.tracks = response.data.tracks;
    })
    .failure(function(response){
      messenger.show(response);
    });
  };



});
