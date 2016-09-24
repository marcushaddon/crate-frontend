crate.controller('trackCtrl', function($scope, stereo){
  $scope.playToggle = function(event) {
    $scope.$emit('trackPlayToggle', event);
  };

  // THIS is what i wanna use
  $scope.isActiveTrack = function(track) {
    alert(JSON.stringify(track));
    alert(JSON.stringify(stereo.activeTrack));
    return stereo.getActiveTrack() == track;
  };
});
