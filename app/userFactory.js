crate.factory('user', function($rootScope, $http, $location, authTokenFactory) {
	return {
		info: {},
		isLoggedIn: false,

		logIn: function(userName, password) {
			return $http({
				method: 'POST',
				url: '/login',
				data: {
					userName: userName,
					password: password
				}
			})
			.then(function(response) {
				authTokenFactory.setToken(response.data.token);
				this.isLoggedIn = true;
				// Wanna maybe move away from this
				// $rootScope.$broadcast('login');
				$location.path('/home');
				this.info = {
					userName: response.data.userName
				};
				return response;
			});
			// Need failure function
		},

		logOut: function() {
			authTokenFactory.setToken();

		}
	}
});
