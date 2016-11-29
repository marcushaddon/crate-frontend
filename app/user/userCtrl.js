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
        var sortedLists = response.data.sort(function(listA, listB) { return listA.dateCreated < listB.dateCreated; });
        $scope.playlists = sortedLists;
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
    stereo.activeList = $scope.userProfile;
    stereo.setActiveTracks($scope.crateTracks);
  };

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
      $location.path('/playlist/' + response.data._id);
			messenger.show(response.data.name + " created!");

		});

	};

  $scope.userProfileImgPlaceholder = config.userImgPlaceholder;
  $scope.albumImgPlaceHolder = config.albumImgPlaceHolder;
});
