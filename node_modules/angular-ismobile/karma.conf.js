module.exports = function(config) {
	'use strict';

	config.set({
		basePath: '',
		frameworks: ['mocha'],
		files: [
			'node_modules/angular/angular.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'node_modules/chai/chai.js',

			'dist/angular-ismobile.js',

			'tests/**/*.spec.js'
		],
		exclude: [],
		preprocessors: {
		},
		reporters: ['mocha', 'progress'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: ['PhantomJS'],
		singleRun: false,
		concurrency: Infinity
	});
};
