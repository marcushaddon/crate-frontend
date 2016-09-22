crate.factory('playlistFactory', function($http){
  // put clerks playlist methods in here
  console.log("I AM THE NEXT PLAYLIST FACOTRY");
  return {
    getUserPlaylists: function(id) {
      return $http({
        method: 'GET',
        url: '/api/user/' + id + '/playlists'
      });
    }
  };
});
