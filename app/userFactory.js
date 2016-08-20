crate.factory('user', function($rootScope, $http) {
	return {
		loginName: '',
		loginPassword: '',
		userName: '',
		api_key: '',
		isLoggedIn: false,

		logIn: function(userName, password) {
			$http({
				method: 'POST',
				url: '/login',
				data: {
					userName: userName,
					password: password
				}
			})
			.then(function(response) {
				this.userName   = response.data.userName;
				this.api_key    = response.data.api_key;
				this.isLoggedIn = true;


				$rootScope.$broadcast('login', {
					userName: this.userName,
					api_key: this.api_key
				}
				);
			});
			// Need failure function
		}
	}
});
