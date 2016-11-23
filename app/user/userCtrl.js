crate.controller('userCtrl', function($scope, $routeParams, $location, config, user, stereo, playlistFactory, albumFactory, messenger){
  $scope.userProfile = {};
  $scope.playlists = [];
  $scope.albums = [];
  $scope.viewing = 'tracks';
  $scope.setView = function(view) {
    $scope.viewing = view;
  }
  $scope.init = function() {
    if (!user.isLoggedIn()) $location.path('/');
    var userProfileId = $routeParams.id;

    user.getUser(userProfileId)
    .then(function(response) {
      $scope.userProfile = response.data;

      // Get playlists by userProfileId
      user.getCratePlaylists($scope.userProfile)
      .then(function(response) {
        $scope.playlists = response.data;
      });

      // Get albums discovered by userProfile
      albumFactory.getAlbumsByUserId(userProfileId)
      .then(function(response){
        $scope.discoveries = response.data;
      }, function(response){
        messenger.show(response.data);
      });

      // Get albums liked by userProfile
      user.getCrateAlbums($scope.userProfile)
      .then(function(response){
        $scope.albums = response.data;
      });

      // Get tracks liked by userProfile
      user.getCrateTracks($scope.userProfile)
      .then(function(response){
        $scope.crateTracks = response.data;
      });

      user.getCrateArtists($scope.userProfile)
      .then(function(response) {
        console.log(response.data);
        $scope.crateArtists = response.data;
      });
    }, function(response) {
      messenger.show(response.data);
    });


  };

  $scope.cueMyTracks = function() {
    stereo.setActiveTracks($scope.crateTracks);
  };

  $scope.userProfileImgPlaceholder = config.userImgPlaceholder;
  $scope.albumImgPlaceHolder = config.albumImgPlaceHolder;
});
