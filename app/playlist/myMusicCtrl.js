crate.controller('myMusicCtrl', function($scope, $rootScope, stereo, user, playlistFactory, messenger){
  $scope.myPlaylists = [];
  $scope.currentPlaylist = {};
  $scope.capturedTrack = {};

  $scope.init = function() {
    if (user.info.userId == undefined) {
      user.refreshUser()
      .then(function(response){
        user.setUser(response.data);
        $scope.getMyPlaylists();
      });
    } else {
      $scope.getMyPlaylists();
    }
  };

  $scope.cueMyTracks = function() {
    stereo.setActiveTracks($scope.currentPlaylist.tracks);
  };

  $scope.getMyPlaylists = function() {
    playlistFactory.getUserPlaylists(user.info.userId)
    .then(function(response){
      $scope.myPlaylists = response.data;
      $scope.currentPlaylist = $scope.myPlaylists[0];
    });
  };

  $scope.setCurrentPlaylist = function(list) {
    $scope.currentPlaylist = list;
  };

  $scope.playToggle = function(track) {
    $rootScope.$broadcast('playToggle');
  };

  $scope.getCurrentPlaylist = function() {
    return $scope.currentPlaylist;
  };

  $scope.isActiveList = function(list) {
    if (stereo.activeList._id != undefined && list._id != undefined) {
      return stereo.activeList._id == list._id;
    }
    return false;
  };

  // $scope.isActiveTrack = function(track) {
  //   return stereo.activeTrack == track;
  // };

  // Create a new playlist, either blank or by copying an album
  $scope.newPlaylist = function() {
    var newPlaylist = {
      listType: "playlist",
      name: "New playlist",
      description: "A cool new playlist by " + user.info.userName,
      imgUrl: null,
      tracks: []
    };

		playlistFactory.createPlaylist(newPlaylist)
		.then(function(response){
      $scope.myPlaylists.unshift(response.data);
			messenger.show(response.data.name + " created!");
		});

	};

  $scope.deleteList = function(list) {
    var listName = list.name;
		playlistFactory.deletePlaylist(list._id)
    .then(function successCallback(response){
      // need to update the browser model
      var indexOfDeletedList = $scope.myPlaylists.indexOf(list);
      $scope.myPlaylists.splice(indexOfDeletedList, 1);
			messenger.show(listName + " deleted!");
		},
    function errorCallback(response){
      messenger.show(response.data);
    });
	};

  $scope.captureTrack = function(track) {
		stereo.capturedTrack = track;
		angular.element('#bottomModal').openModal();
	};

  $scope.getCapturedTrack = function() {
    return playlistFactory.capturedTrack;
  };

  $scope.addTrackToPlaylist = function(playlist) {
    var newTracks = playlist.tracks;
    newTracks.push(playlistFactory.capturedTrack);
    playlistFactory.editPlaylist(playlist, 'tracks', newTracks)
    .then(function(response){
      // update our model somehow!
      messenger.show(playlistFactory.capturedTrack.trackName + " added to " + playlist.name);
    });
  };

  $scope.removeTrack = function (track) {
		var tracks = $scope.currentPlaylist.tracks;
		var pos = tracks.indexOf(track);
		tracks.splice(pos, 1);
		playlistFactory.editPlaylist($scope.currentPlaylist, 'tracks', tracks)
		.then(function(response){
      messenger.show(JSON.stringify(response.data));
		});
	};

  $scope.editList = function(list, field, value, event) {
    if (event) {
      value = event.target.innerHTML;
    }

    playlistFactory.editPlaylist(list, field, value)
    .then(function(response){
      var indexOfEditedList = $scope.myPlaylists.indexOf(list);
      $scope.myPlaylists.splice(indexOfEditedList, 1, response.data);
      $scope.currentPlaylist = response.data;
    })
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

    $scope.editList($scope.currentPlaylist, 'tracks', tracks);
	};

  // $scope.saveAlbumAsPlaylist = function(album) {
	// 	playlistFactory.saveAlbumAsPlaylist(album)
  //   .then(function(response){
  //     $scope.myPlaylists.push(response.data);
  //     messenger.show(response.data.name + " created!");
  //   });
	// };

  // $scope.$on('trackPlayToggle', function(event){
  //   if ($scope.currentPlaylist == undefined || $scope.currentPlaylist == {}) {
  //     return;
  //   }
  //   // send our tracks up the scope chain to be queueueueueed up by MainCtrl
  //   $scope.$emit('listPlayToggle', $scope.currentPlaylist);
  //
  //
  // });


});
