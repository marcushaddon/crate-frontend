crate.controller('bottomModalCtrl', function($scope, playlistFactory, stereo, messenger, user){
  $scope.playlists = [];
  $scope.getCapturedTrack = function() {
    return playlistFactory.capturedTrack;
  };

  $scope.addTrackToPlaylist = function(playlist) {
    event.preventDefault();
    playlist.tracks.push(playlistFactory.capturedTrack);
    playlistFactory.editPlaylist(playlist)
    .then(function(response){
      // update our model somehow!
      messenger.show(playlistFactory.capturedTrack.trackName + " added to " + playlist.name);
      angular.element('#bottomModal').closeModal();
    });
  };

  $scope.newPlaylistFromTrack = function() {
    var newPlaylist = {
      listType: 'playlist',
      name: playlistFactory.capturedTrack.artist + ' - ' + playlistFactory.capturedTrack.trackName,
      description: 'A deep cut.',
      imgUrl: '',
      tags: [],
      tracks: [playlistFactory.capturedTrack]
    };
    playlistFactory.createPlaylist(newPlaylist)
    .then(function(response) {
      $scope.playlists.unshift(response.data);
      messenger.show(response.data.name + ' created!');
      angular.element('#bottomModal').closeModal();
    });
  };

  $scope.init = function() {
    angular.element('#bottomModal').modal();
  };

  $scope.$on('modalRefresh', function(){
    playlistFactory.getUserPlaylists(user.info.userId)
    .then(function(response){
      $scope.playlists = response.data;
    });
  })
});
