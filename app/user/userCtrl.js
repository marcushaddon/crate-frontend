crate.controller('userCtrl', function($scope, $stateParams, config, user, messenger){
  $scope.user = {};
  $scope.playlists = [];
  $scope.albums = [];
  $scope.init = function() {
    var userId = $stateParams.id;

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
