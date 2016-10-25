	crate.controller('Uploader', function($scope, $location, config, stereo, discogsFactory, uploadFactory, messenger){
	$scope.videoId = '';
	$scope.albumNmae = '';
	$scope.artistName = '';
	$scope.possibleMasters = [];
	$scope.possibleArtists = [];

	$scope.getUpdates = function() {
		return uploadFactory.progressUpdates;
	};

	$scope.getProgressComplete = function() {
		return uploadFactory.processingComplete;
	};

	$scope.getNextStop = function() {
		return uploadFactory.nextStop;
	};

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
		// This should be called from inside of uploadFactoris method so other methods dont come out of order!
		$location.path('/upload/printout');
		uploadFactory.useDiscogsEntity(master)

	};

	$scope.useDiscogsRelease = function(release) {
		uploadFactory.videoId = $scope.videoId;
		$location.path('/upload/printout');
		uploadFactory.useDiscogsEntity(release);
	};

	$scope.artistImgPlaceholder = config.artistImgPlaceholder;


});
