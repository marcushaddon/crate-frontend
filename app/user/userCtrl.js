crate.controller('userCtrl', function($scope, $routeParams, $location, config, user, playlistFactory, albumFactory, messenger){
  $scope.user = {};
  $scope.playlists = [];
  $scope.albums = [];
  $scope.user = user;
  $scope.viewing = 'albums';
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
    playlistFactory.getUserPlaylists(userId)
    .then(function(response) {
      $scope.playlists = response.data;
    },
    function(response) {
      messenger.show(response.data);
    })

    // Get albums by user
    albumFactory.getAlbumsByUserId(userId)
    .then(function(response){
      $scope.albums = response.data;
    }, function(response){
      messenger.show(response.data);
    })


  };

  $scope.userImgPlaceholder = config.userImgPlaceholder;
  $scope.albumImgPlaceHolder = config.albumImgPlaceHolder;
});
