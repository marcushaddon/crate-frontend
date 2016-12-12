crate.controller('masterCtrl', function($scope, discogsFactory, messenger) {
  $scope.getMoreInfo = function(master) {
    if ($scope.info == undefined) {
      discogsFactory.getAlbum(master.id, master.type)
      .then(function(response) {
        $scope.info = response.data;
      });
    }
    $scope.showInfo = true;

  };
});
