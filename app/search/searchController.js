crate.controller('SearchCtrl', function($scope, $http, $rootScope, $location, $routeParams, angularConfig, messenger, stereo){
  $scope.isWeb = angularConfig.context === 'web';
  $scope.artists = [];
  $scope.albums = [];
  $scope.tracks = [];
  $scope.playlists = [];

  // Search methods
  $scope.artistSearch = function(query) {
    return $http({
      method: 'GET',
      url: '/api/search/artist/' + query
    });
  };

  $scope.albumSearch = function(query) {
    return $http({
      method: 'GET',
      url: '/api/search/album/' + query
    });
  };

  $scope.trackSearch = function(query) {
    return $http({
      method: 'GET',
      url: '/api/search/track/' + query
    });
  };

  $scope.playlistSearch = function(query) {
    return $http({
      method: 'GET',
      url: '/api/search/playlist/' + query
    });
  };

  $scope.tagSearch = function(query) {
    return $http({
      method: 'GET',
      url: '/api/search/tag/' + query
    });
  };

  // Master search
  $scope.search = function() {
    var searchType = $routeParams.searchType;
    // If we are not searching for a tag
    if (searchType === 'general') {
      var startTime = Date.now();
      var query = $routeParams.searchField;
      $scope.query = query;
      $scope.artistSearch(query)
      .then(function(results){
        $scope.artists = results.data;
        $scope.albumSearch(query)
        .then(function(response){
          $scope.albums = response.data;
          $scope.trackSearch(query)
          .then(function(response){
            $scope.tracks = response.data;
            $scope.playlistSearch(query)
            .then(function(response){
              $scope.playlists = response.data;
              var endTime = Date.now();
              var duration = (endTime - startTime) / 1000;
              messenger.show("Search for " + query + " completed in " + duration + " seconds!");
            });
          });
        });
      });
    } else if (searchType === 'tag') {
      $scope.tag = $routeParams.searchField;
      $scope.tagSearch(tag)
      .then(function(response) {
        $scope.taggedAlbums = response.data;
      })
    } else {
      return;
    }
  };

  $scope.research = function() {
    $location.path('search' + $scope.searchField);
  };

  $scope.getResultsLength = function() {
    var result = $scope.artists.length + $scope.albums.length + $scope.tracks.length + $scope.playlists.length;
    console.log(result);
    return result;
  };

  // Cue my tracks
  $scope.cueMyTracks = function() {
    stereo.activeList = { listType: 'search', term: $routeParams.searchField };
    stereo.setActiveTracks($scope.tracks);
  };

});
