crate.controller('Uploader', function($scope, config, stereo, discogsFactory, uploadFactory, messenger){
	$scope.videoId = '';
	$scope.albumNmae = '';
	$scope.artistName = '';
	$scope.possibleMasters = [];
	$scope.possibleArtists = [];

	// $scope.getTrackCandidates = function() {
	// 	return uploadFactory.tracks;
	// };

	$scope.checkDiscogsForUpload = function() {
		// There must be a urlStringEncode method or something
		discogsFactory.searchForRelease($scope.artistName + ' ' + $scope.albumName)
		.then(function(response){
			$scope.possibleMasters = response.data.results;

		})
	};

	$scope.checkDiscogsForArtist = function() {
		$scope.possibleMasters = [];
		discogsFactory.searchForArtist($scope.artistName)
		.then(function(response){
			$scope.possibleArtists = response.data.results;
		});
	};

	$scope.getArtistReleases = function(artist) {
		discogsFactory.getArtistReleases(artist.id)
		.then(function(response){
			$scope.possibleArtists = [];
			$scope.possibleMasters = response.data.releases;
		});
	};

	// yah redundant i know
	$scope.useDiscogsMaster = function(master) {
		uploadFactory.videoId = $scope.videoId;
		uploadFactory.useDiscogsEntity(master)

	};

	$scope.useDiscogsRelease = function(release) {
		uploadFactory.videoId = $scope.videoId;
		uploadFactory.useDiscogsEntity(release);
	};

	$scope.artistImgPlaceholder = config.artistImgPlaceholder;


});
