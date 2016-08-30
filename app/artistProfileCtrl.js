crate.controller('ArtistProfileCtrl', function($scope, $location, $routeParams, clerk){
  $scope.artist = {
    artist: { name: "NEW GUY" }
  };
  $scope.testThing = function() { alert("HEY YOU FUCK"); };

  $scope.getArtist = function() {
    var artistId = $routeParams.id;
    console.log(artistId);
		clerk.getArtist(artistId, function(response){


			$scope.artist = response.data;
      console.log($scope.artist);


		}, function(response){
			console.log(response);
		})

	};
});
