crate.factory('fbAuthFactory', function($http, $location, $window){
  return {
    getRedirectUri: function() {
      if ($location.host() == 'localhost') {
        return 'http://localhost:3000/fbLogin.html';
      } else {
        return $location.protocol() + '://' + $location.host() + '/fbLogin.html';
      }
    },
    loginEndpoint: 'https://www.facebook.com/v2.8/dialog/oauth?client_id=1780591808825823&redirect_uri=',
    // loginRedirectUri: 'http://localhost:3000/fbLogin.html',
    // loginRedirectUri: 'https://cratebeta.herokuapp.com/fbLogin.html',
    loginRedirectUri: $location.protocol() + '://' + $location.host() + '/fbLogin.html',
    loginRedirect: function() {
      $window.location.href = encodeURI(this.loginEndpoint + this.getRedirectUri() + '&response_type=token');
    }
  };
});
