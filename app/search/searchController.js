crate.controller('SearchCtrl', function($scope, $http, $rootScope, $location, $routeParams, stereo){
  $scope.results = {};

  $scope.search = function() {

    $http({
      method: 'GET',
      url: '/api/search/' + $routeParams.searchField
    }).then(function(response){
      console.log(response.data);
      $scope.results = JSON.parse(response.data);
    });
  };
});
