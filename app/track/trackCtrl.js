crate.controller('trackCtrl', function($scope){
  $scope.playToggle = function(event) {
    $scope.$emit('trackPlayToggle', event);
  };
});
