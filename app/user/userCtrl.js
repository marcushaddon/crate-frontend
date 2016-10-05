crate.controller('userCtrl', function($scope, $stateParams, config, user, playlistFactory, messenger){
  $scope.user = {};
  $scope.playlists = [];
  $scope.albums = [];
  $scope.view = 'albums';
  $scope.getView = function() { return $scope.view; };
  $scope.setView = function(view) {
    $scope.view = view;
  };

  $scope.init = function() {
    var userId = $stateParams.id;

    user.getUser(userId)
    .then(function(response){
      $scope.user = response.data;
    }, function(response){
      messenger.show(response.data);
    });

    // Get playlists by userId
    playlistFactory.getUserPlaylists(userId)
    .then(function(response){
      $scope.playlists = response.data;
    },
    function(response){
      messenger.show(response.data);
    })
    // Get albums by user



  };

  $scope.userImgPlaceholder = config.userImgPlaceholder;
});
