crate.controller('Uploader', function($scope, $location, user, config, stereo, discogsFactory, uploadFactory, messenger){
	$scope.videoUrl = '';
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

	$scope.getVideoInfo = function() {
		return uploadFactory.videoInfo;
	};

	// $scope.getTrackCandidates = function() {
	// 	return uploadFactory.tracks;
	// };

	$scope.checkDiscogsForUpload = function() {
		// There must be a urlStringEncode method or something
		var query = $scope.albumName + ' ' + $scope.artistName;
		discogsFactory.searchForRelease(query)
		.then(function(response) {
			if (response.data.results.length > 0) {
				$scope.possibleMasters = response.data.results;
				console.log("Got masters and our list has " + $scope.possibleMasters.length);
			}
			discogsFactory.searchForArtist($scope.artistName)
			.then(function(response){
				if (response.data.results.length > 0) {
					var firstArtist = response.data.results[0];
					discogsFactory.getArtistReleases(firstArtist.id)
					.then(function(response) {
						// Concat them and sort them all!!!

						$scope.possibleMasters = $scope.possibleMasters.concat(response.data.releases);
						console.log("Got artist releases and our list has " + $scope.possibleMasters.length);

						$scope.possibleMasters = $scope.possibleMasters.sort(function(releaseA, releaseB) {
							return $scope.textMatch($scope.albumName, releaseB.title) - $scope.textMatch($scope.albumName, releaseA.title);
						});
						// $scope.possibleMasters = response.data.releases;
						// console.log($scope.possibleMasters);
					})
				}
			})
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
		uploadFactory.videoId = $scope.getVideoId();
		// This should be called from inside of uploadFactoris method so other methods dont come out of order!

		$location.path('/upload/printout');
		uploadFactory.useDiscogsEntity(master)

	};

	$scope.useDiscogsRelease = function(release) {
		uploadFactory.videoId = $scope.getVideoId();
		$location.path('/upload/printout');
		uploadFactory.useDiscogsEntity(release);
	};

	$scope.textMatch = function(stringA, stringB) {
	  arrayA = stringA.toLowerCase().split('');
	  arrayB = stringB.toLowerCase().split('');
	  var matchCount = 0;

	  for (letter in arrayA) {
	    var matchIndex = arrayB.indexOf(arrayA[letter]);
	    if (matchIndex > -1) {
	      matchCount++;
	      arrayB.splice(matchIndex, 1);
	    }
	  }
	  return matchCount / arrayA.length;
	};

	$scope.getVideoId = function() {
		var url = $scope.videoUrl;
		var vIndex = url.indexOf('v=');
	  if (vIndex > -1) {
	    var id = url.slice(vIndex + 2);
	    var query = id.indexOf('&');
	    if (query > -1) {
	      id = id.slice(0, query);
	    }
	    return id;
	  }
		return false;
	};

	$scope.checkForVideo = function() {
		if ($scope.getVideoId()) {
			console.log("Video id is: " + $scope.getVideoId());
			uploadFactory.getVideoInfo($scope.getVideoId())
			.then(function(response) {
				var info = uploadFactory.videoInfo;
				info.description = info.description.replace(/\n/g, '<br>');
				$scope.videoInfo = info;
				$scope.videoInfo.description = $scope.videoInfo.description.replace('\n', '<br>');
				messenger.show("We've displayed details about the video you just entered below!");
			});
		}
	};

	$scope.artistImgPlaceholder = config.artistImgPlaceholder;

	uploadFactory.progressUpdates = [];
	uploadFactory.processingComplete = false;

	// INIT
	$scope.init = function() {
		// alert("FUCK OFF");
	};
});
