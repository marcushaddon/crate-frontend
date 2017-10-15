crate.controller('playlistCtrl', function($scope, $location, $routeParams, $http, playlistFactory, user, stereo, config, messenger){
  $scope.playlist = {};
  $scope.playlistId = $routeParams.id;
  $scope.editable = false;
  $scope.editing = false;
  $scope.albumImgPlaceholder = config.albumImgPlaceHolder;

  // On load
  $scope.init = function() {

    if ($scope.playlistId) {
      playlistFactory.getPlaylist($scope.playlistId)
      .then(function(response){
        $scope.playlist = response.data;
        $scope.editable = $scope.playlist.createdBy.userId == user.info.userId;
      },
      function(response){
        messenger.show(response.data);
      });
    }
  };

  $scope.cueMyTracks = function() {
    stereo.activeList = $scope.playlist;
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
    playlist.createdBy = {
      userName: user.info.userName,
      userId: user.info.userId
    };
    playlistFactory.createPlaylist(playlist)
    .then(function(response) {
      messenger.show("You created a copy of " + playlist.name + "!");
      $location.path('/playlist/' + response.data._id);
    });
  };

  $scope.deletePlaylist = function() {
    var confirmation = confirm("Are you sure you want to delete " + $scope.playlist.name +"? This can't be undone!");
    if (confirmation) {
      playlistFactory.deletePlaylist($scope.playlist._id)
      .then(function(response) {
        messenger.show("Ok fine! '" + $scope.playlist.name + "' deleted forever! I hope you're happy!");
        $location.path('/user/' + user.info.userId);
      });
    }
  };

  // Editing controls
  $scope.editToggle = function() {
    if ($scope.playlist.createdBy.userId === user.info.userId) {
      $scope.editing = ! $scope.editing;
    }
  };

  $scope.removeTrack = function (track) {
		var tracks = $scope.playlist.tracks;
		var pos = tracks.indexOf(track);
		tracks.splice(pos, 1);
		playlistFactory.editPlaylist($scope.playlist)
		.then(function(response){
      messenger.show(track.trackName + ' removed from ' + $scope.playlist.name);
		});
	};

  $scope.moveTrack = function(track, direction) {
    // For now we are assuming that if this function is being called, the playlist is nessecarily the controllers active playlist (probably pretty safely, but stiil, good to keep in mind)
		var tracks = $scope.playlist.tracks;
    var current = tracks.indexOf(track);
    var targetIndex = current + direction;
    // Make sure we are not trying to move the track off the list
    if (targetIndex < 0) {
      messenger.show("Track is already at the beginning of playlist!");
      return false;
    } else if (targetIndex > tracks.length - 1) {
      messenger.show("Track is already at the end of playlist!");
      return false;
    }

    var temp = tracks[targetIndex];
    tracks[targetIndex] = track;
    tracks[current] = temp;

    playlistFactory.editPlaylist($scope.playlist);
	};

  $scope.checkForEnter = function(event) {
    event.stopPropagation();
    if (event.which == 13) $scope.updateName(true);
  };

  $scope.updateName = function(editOff) {
    editOff = editOff || false;
    playlistFactory.editPlaylist($scope.playlist)
    .then(function(response){
      messenger.show('Playlist renamed "' + $scope.playlist.name + '"');
      if (editOff) $scope.editing = false;
    });
  };

  $scope.editImg = function() {
    playlistFactory.editPlaylist($scope.playlist)
    .then(function(response) {
      $scope.editingImg = false;
    });
  };

});
