crate.controller('playlistCtrl', function($scope, playlistFactory, messenger){
  $scope.myPlaylists = [];
  $scope.currentPlaylist = {};
  $scope.capturedTrack = {};

  $scope.init = function() {
    // update our model to match the server
  };


  // Create a new playlist, either blank or by copying an album
  $scope.createList = function(album) {
		if (!album) {
			playlistFactory.createPlaylist()
			.then(function(response){
				messenger.show(response.data.name + " created!");
			});
		}
	};

  $scope.deleteList = function(list) {
    var listName = list.name;
		playlistFactory.deletePlaylist(list._id)
    .then(function(response){

			messenger.show(listName + " deleted!");
		});
	};

  $scope.captureTrack = function(track) {
		$scope.capturedTrack = track;
		angular.element('#bottomModal').openModal();
	};

  $scope.addTrackToPlaylist = function(track, playlist) {
    var newTracks = playlist.tracks;
    newTracks.push(track);
    playlistFactory.editPlaylist(playlist, 'tracks', newTracks)
    .then(function(response){
      // update our model somehow!
      messenger.show(response.data);
    });
  };

  $scope.removeTrack = function (track, list) {
		var tracks = list.tracks;
		var pos = tracks.indexOf(track);
		tracks.splice(pos, 1);
		playlistFactory.editPlaylist(list, 'tracks', tracks)
		.then(function(response){
			// update our model somehow!
      messenger.show(response.data);
		});
	};

  // direction is either -1 (backwards) or 1 (forwards)
  $scope.moveTrack = function(track, direction) {
    // For now we are assuming that if this function is being called, the playlist is nessecarily the controllers active playlist (probably pretty safely, but stiil, good to keep in mind)
		var tracks = $scope.currentPlaylist.tracks;
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

    // Ok now we've swtichted the tracks, lets update the backend
    playlistFactory.editPlaylist($scope.currentPlaylist, 'tracks', tracks)
    .then(function(response){
      //update our model
      messenger.show(response.data);
    });
	};

  $scope.saveAlbumAsPlaylist = function(album) {
		playlistFactory.saveAlbumAsPlaylist(album)
    .then(function(response){
      $scope.myPlaylists.push(response.data);
      messenger.show(response.data.name + " created!");
    });
	};


});
