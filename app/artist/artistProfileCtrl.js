crate.controller('ArtistProfileCtrl', function($scope, $location, $routeParams, artistFactory){
  $scope.artist = {
    artist: { name: "NEW GUY" }
  };

  $scope.init = function() {
    var artistId = $routeParams.id;
		artistFactory.getArtist(artistId).then(function(response){


			$scope.artist = response.data;
      console.log($scope.artist);


		});

	};
});
