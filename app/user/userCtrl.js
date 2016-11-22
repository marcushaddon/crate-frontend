crate.controller('userCtrl', function($scope, $routeParams, $location, config, user, playlistFactory, albumFactory, messenger){
  $scope.user = {};
  $scope.playlists = [];
  $scope.albums = [];
  $scope.user = user;
  $scope.viewing = 'tracks';
  $scope.setView = function(view) {
    $scope.viewing = view;
  }
  $scope.init = function() {
    if (!user.isLoggedIn()) $location.path('/');
    var userId = $routeParams.id;

    user.getUser(userId)
    .then(function(response) {
      $scope.user = response.data;
    }, function(response) {
      messenger.show(response.data);
    });

    // Get playlists by userId
    user.getCratePlaylists()
    .then(function(response) {
      $scope.playlists = response.data;
    });

    // Get albums discovered by user
    albumFactory.getAlbumsByUserId(userId)
    .then(function(response){
      $scope.discoveries = response.data;
    }, function(response){
      messenger.show(response.data);
    });

    // Get albums liked by user
    user.getCrateAlbums()
    .then(function(response){
      $scope.albums = response.data;
    });

    // Get tracks liked by user
    user.getCrateTracks()
    .then(function(response){
      $scope.crateTracks = response.data;
    });

    user.getCrateArtists()
    .then(function(response) {
      console.log(response.data);
      $scope.crateArtists = response.data;
    })


  };

  $scope.userImgPlaceholder = config.userImgPlaceholder;
  $scope.albumImgPlaceHolder = config.albumImgPlaceHolder;
});
