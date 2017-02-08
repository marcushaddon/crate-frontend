crate.controller('userCtrl', function($scope, $routeParams, $location, angularConfig, config, user, stereo, playlistFactory, albumFactory, messenger){
  $scope.userProfile = {};
  $scope.playlists = [];
  $scope.albums = [];
  $scope.viewing = 'tracks';
  $scope.showProfile = true;
  $scope.onWeb = angularConfig.context === "web" ? true : false;
  $scope.setView = function(view) {
    $scope.viewing = view;
    // Append view to query string so this will create a history item
    $location.search('viewing', view);
  }

  $scope.getViewTitle = function() {
    return $scope.viewing[0].toUpperCase() + $scope.viewing.slice(1);
  };

  $scope.init = function() {
    if (!user.isLoggedIn()) $location.path('/');
    // Check what we should be viewing
    $scope.viewing = $location.search().viewing || 'albums';

    // Initialize materialize's dropdowns
    angular.element('select').material_select();

    var userProfileId = $routeParams.id;
    if (userProfileId == user.info.userId) $scope.showProfile = false;
    user.getUser(userProfileId)
    .then(function(response) {
      var days = [];
      var itemsArray = [];
      var listenHistory = response.data.recentlyListenedItems;
      for (item in listenHistory) {
        var date = new Date(listenHistory[item].dateAdded);
        var day = date.toDateString();
        var existingDay = days.findIndex(function(o){ return o == day; });
        if (existingDay == -1) {
          days.push(day);
          itemsArray.push([listenHistory[item]]);
        } else {
          itemsArray[existingDay].push(listenHistory[item]);
        }
      }
      // Now sort them
      itemsArray = itemsArray.reverse().map(function(array) {
        return array.sort(function(a, b) { return new Date(b.dateAdded) - new Date(a.dateAdded); });
      });
      $scope.userProfile = response.data;
      $scope.userProfile.recentlyListenedItemGroups = itemsArray;
      $scope.userProfile.recentlyListenedItems = $scope.userProfile.recentlyListenedItems.reverse();

      // Get playlists by userProfileId
      user.getCratePlaylists($scope.userProfile)
      .then(function(response) {

        var sortedLists = response.data.sort(function(listA, listB) { return listA.dateCreated < listB.dateCreated; });
        $scope.playlists = sortedLists;
      });

      // Get albums discovered by userProfile
      albumFactory.getAlbumsByUserId(userProfileId)
      .then(function success(response) {
        $scope.discoveries = response.data;
      }, function failure(response) {
        messenger.show(response.data);
      });

      // Get albums liked by userProfile
      user.getCrateAlbums($scope.userProfile)
      .then(function(response) {
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

  $scope.getUserCrateViewParam = function(view, param) {
    return user.getCrateViewParam(view, param);
  };

  $scope.setUserCrateViewParam = function(view, param, value) {
    user.setCrateViewParam(view, param, value);
  };

  $scope.cueMyTracks = function(recentlyListened) {
    recentlyListened = recentlyListened || false;
    if (!recentlyListened) {
      stereo.setActiveTracks($scope.crateTracks);
    } else {
      var recentTracks = $scope.userProfile.recentlyListenedItems.map(function(o) { return o.track; });
      stereo.setActiveTracks(recentTracks);
    }
    stereo.activeList = $scope.userProfile;
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
