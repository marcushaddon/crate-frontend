crate.controller('trackEditCtrl', function($scope, $location, uploadFactory, messenger, stereo){
  $scope.tracks = [];
  $scope.album = {};
  $scope.artist = {};
  $scope.editTrack = null;
  $scope.editField = null;
  $scope.videoLength = 0;
  $scope.init = function() {
    $scope.album = uploadFactory.album;
    $scope.artist = uploadFactory.artist;
    $scope.tracks = uploadFactory.tracks;
    $scope.tracks[0].begin = 0;
    $scope.editTrack = $scope.tracks[0];
    $scope.editField = 'stop';
    // Cue our video
    var preview = {
      artistName: $scope.artist.name,
      trackName: $scope.album.name,
      videoId: $scope.tracks[0].videoId,
      begin: 0,
      stop: 100000

    };

    // new Track(0, $scope.artist.name, $scope.album.name, '', '', $scope.tracks[0].videoId, 0, 10000);
    stereo.setTrack(preview);
    var endingAdjustment = setTimeout(function(){
					var theEnd = stereo.getVideoLength();
          $scope.videoLength = theEnd;
					angular.element('#progress').attr('max', theEnd);
					angular.element('#totalTime').html(' / ' + secToMinSec(theEnd));
					$scope.$apply();
					console.log("THE LENGTH" + stereo.getVideoLength())
				}, 3000);
  };

  $scope.setEditTarget = function(index, field) {
    $scope.editTrack = $scope.tracks[index];
    $scope.editField = field;
  };

  $scope.setTime = function() {
    $scope.editTrack[$scope.editField] = stereo.getProgress();
    if ($scope.editField == 'stop') {
      var currentIndex = $scope.tracks.indexOf($scope.editTrack);
      $scope.tracks[currentIndex + 1].begin = stereo.getProgress();
      $scope.setEditTarget(currentIndex + 1, 'stop');
    } else if ($scope.editField == 'begin') {
      $scope.editField = 'stop';
    }

    if ($scope.testForCompleteness()) {
      angular.element('#submitTracks').removeClass('disabled');
      messenger.show("WHOOHOO");
    }

  }


  $scope.testTracks = function() {
    console.log($scope.tracks);
  };

  $scope.testForCompleteness = function() {
    var ready = true;
    for (var i = 0, length = $scope.tracks.length -1; i < length; i++) {
      if ($scope.tracks[i].begin === null || $scope.tracks[i].stop === null) {
        ready = false;
        }
      }
      if (ready) {
        var lastTrack = $scope.tracks[$scope.tracks.length - 1];
        if (lastTrack.begin === null) {
          ready = false;
        } else if (lastTrack.stop === null) {
          $scope.tracks[$scope.tracks.length -1].stop = $scope.videoLength;
        }
        return ready;
      }
  };

  $scope.submitTracks = function() {
    if ($scope.testForCompleteness()) {
      uploadFactory.createTracks($scope.tracks)
      .then(function(response){
        messenger.show("Congratulations! You've added " + $scope.album.name + " by " + $scope.artist.name + " to Crate! +1 cred!");
        $location.path('/album/' + $scope.tracks[0].albumId);
      });;
    } else {
      messenger.show("Looks like you aren't quite done editing these tracks!");
    }

    }


});
