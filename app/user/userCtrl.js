crate.controller('userCtrl', function($scope, $routeParams, config, user, messenger){
  $scope.user = {};
  $scope.playlists = [];
  $scope.albums = [];
  $scope.init = function() {
    var userId = $routeParams.id;

    user.getUser(userId)
    .then(function(response){
      $scope.user = response.data;
    }, function(response){
      messenger.show(response.data);
    });

    // Get playlists by userId

    // Get albums by user



  };

  $scope.userImgPlaceholder = config.userImgPlaceholder;
});
