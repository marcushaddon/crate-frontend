crate.controller('playlistCtrl', function($scope, $routeParams, $http, playlistFactory, user, stereo, config, messenger){
  $scope.playlist = {};
  $scope.playlistId = $routeParams.id;


  $scope.init = function() {
    if ($scope.playlistId) {
      playlistFactory.getPlaylist($scope.playlistId)
      .then(function(response){
        $scope.playlist = response.data;
      },
      function(response){
        messenger.show(response.data);
      });
    }
  };

  $scope.cueMyTracks = function() {
    playlistFactory.incrementListens($scope.playlistId);
    stereo.setActiveTracks($scope.playlist.tracks);
  };

  $scope.crateToggle = function(playlist) {
    user.toggleCratePlaylist(playlist)
    .then(function(response){
      if (response.data === 'removed') {
        playlist.iLikeThis = false;
        messenger.show(playlist.name + " removed from your crate.");
      } else {
        playlist.iLikeThis = true;
        messenger.show(playlist.name + " added to your crate!");
      }
    });
  };

  $scope.copyPlaylist = function(playlist) {
    alert("COPTCAT??!");
  };

  $scope.albumImgPlaceholder = config.albumImgPlaceHolder;
});
