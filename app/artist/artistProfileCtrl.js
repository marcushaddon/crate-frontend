crate.controller('ArtistProfileCtrl', function($scope, $location, $routeParams, artistFactory, stereo){
  $scope.artist = {
    artist: { name: "NEW GUY" }
  };

  $scope.init = function() {
    var artistId = $routeParams.id;
		artistFactory.getArtist(artistId).then(function(response){
			$scope.artist = response.data;
		});
	};

  $scope.cueMyTracks = function() {
    stereo.setActiveTracks($scope.artist.tracks);
  };
});
