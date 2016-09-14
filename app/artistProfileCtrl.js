crate.controller('ArtistProfileCtrl', function($scope, $location, $routeParams, clerk){
  $scope.artist = {
    artist: { name: "NEW GUY" }
  };

  $scope.init = function() {
    var artistId = $routeParams.id;
		clerk.getArtist(artistId).then(function(response){


			$scope.artist = response.data;
      console.log($scope.artist);


		}).failure(function(response){
			console.log(response);
		});

	};
});
