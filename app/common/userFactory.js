crate.factory('user', function($rootScope, $http, $location, authTokenFactory) {
	return {
		user: this,
		info: {},
		isLoggedIn: false,

		setUser: function(userData) {
			this.info = userData;
			this.loggedIn = true;
		},

		refreshUser: function() {
			return $http({
							method: 'POST',
							url: '/api/user/whoAmI'
						});
		},

		getUser: function(id) {
			return $http({
				method: 'GET',
				url: '/api/user/' + id
			});
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
