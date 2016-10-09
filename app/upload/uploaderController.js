crate.controller('Uploader', function($scope, config, stereo, discogsFactory, uploadFactory, messenger){
	$scope.videoId = '';
	$scope.albumNmae = '';
	$scope.artistName = '';
	$scope.possibleMasters = [];

	$scope.checkDiscogsForUpload = function() {
		// There must be a urlStringEncode method or something
		discogsFactory.searchForRelease($scope.artistName + ' ' + $scope.albumName)
		.then(function(response){
			$scope.possibleMasters = response.data.results;
			console.log(response.data.results);

		})
	};

	$scope.useDiscogsMaster = function(master) {
		uploadFactory.useDiscogsMaster(master)

	};

	$scope.artistImgPlaceholder = config.artistImgPlaceholder;


});
