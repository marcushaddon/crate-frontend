# angular-ismobile
A Angular wrapper provider-service for isMobile (https://github.com/kaimallea/isMobile).

By Ronny Haase, 2016. Licensed under [CC0 1.0 Universal (CC0 1.0)](http://creativecommons.org/publicdomain/zero/1.0/).

## Introduction
This is a stupid provider-service (meaning it's also  available in Angular's configuration phase) that provides a cloned instance of isMobile.

It sniffs the user agent for mobile browsers, what you usually shouldn't need to do (responsive design, etc.), *but it's a real world, isn't it*?

See [isMobile](https://github.com/kaimallea/isMobile), to get more details on what and how it exactly works, and what will be returned by the service.

**Important notice:** The distributed version already includes isMobile.js!

## Installation

Use `npm`:

	$ npm install angular-ismobile

Or `Bower`:

	$ bower install angular-ismobile

Or grab the latest [release](https://github.com/ronnyhaase/angular-ismobile/releases) and add the JS file manually.

```html
<script src="angular-ismobile.js"></script>
```
Or minified:

```html
<script src="angular-ismobile.min.js"></script>
```

**Important notice:** The distributed version already includes *isMobile.js*!

## Usage

As mentioned in the Introduction, the service simply returns a clone of the isMobile object.
See [isMobile](https://github.com/kaimallea/isMobile), for details and reference.

```js
// Add angular-ismobile module to your own module
angule.module('myApp', ['ismobile']);

// Inside a config-block, you inject the provider
angular.module('myApp').config(['$routeProvider', 'isMobileProvider',
	function ($routeProvider, isMobile) {
		if (isMobile.phone) {
			$location.path('/mobile');
		}

		$routeProvider.when('/mobile', {
			// ...
		});

		// ...
	}]);

// At runtime (run-block, controllers, anywhere), you inject the service instance
angular.module('myApp').controller('someController', ['isMobile', function(isMobile) {
	if (isMobile.phone) {
		// ...
	}
}];
```

## Contributing
Please create an issue. If you add a pull request, try to respect my code style, check for JSHint and assure the unit tests do pass, and extend them if necessary!
