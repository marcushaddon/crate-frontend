crate.factory('user', function($rootScope, $http, $location, authTokenFactory) {
	return {
		user: this,
		info: {},
		isLoggedIn: false,

		setUser: function(userData) {
			this.info = {
				userName: response.data.userName
			};
			this.loggedIn = true;
		},

		logIn: function(userName, password) {
			return $http({
				method: 'POST',
				url: '/login',
				data: {
					userName: userName,
					password: password
				}
			});
			// Need failure function
		},

		logOut: function() {
			authTokenFactory.setToken();
			$location.path('login');

		}
	}
});
