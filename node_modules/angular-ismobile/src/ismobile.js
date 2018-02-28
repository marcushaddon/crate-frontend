// @include ../node_modules/ismobilejs/isMobile.js

/**
 * angular-ismobile by Ronny Haase <ronhaase@gmail.com>
 *
 * Licensed under CC0 1.0 Universal (CC0 1.0)
 *
 * https://github.com/ronnyhaase/angular-ismobile
 */
(function () {
	'use strict';

	angular.module('ismobile', []);

	angular.module('ismobile').provider('isMobile', ['$windowProvider', function IsMobileProvider($windowProvider) {
		var _window = $windowProvider.$get();

		angular.merge(this, _window.isMobile);

		this.$get = [function isMobileFactory() {
			return angular.copy(_window.isMobile);
		}];
	}]);
})();
