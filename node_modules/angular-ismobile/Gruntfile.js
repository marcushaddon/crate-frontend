module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		preprocess: {
			options: {
				context: {}
			},
			js: {
				src: 'src/ismobile.js',
				dest: 'dist/angular-ismobile.js'
			}
		},

		uglify: {
			options: {
				preserveComments: 'some'
			},
			dist : {
				files : { 'dist/angular-ismobile.min.js' : ['dist/angular-ismobile.js'] }
			}
		},

		jshint: {
			options : {
				jshintrc: '.jshintrc',
					ignores: []
			},
			all : ['src/**/*.js', 'tests/**/*.js', 'Gruntfile.js', 'index.js', 'karma.conf.js']
		},

		karma: {
			// Karma watches
			auto: {
				configFile: 'karma.conf.js',
				autoWatch: true
			},
			// Grunt watches
			watched: {
				configFile: 'karma.conf.js',
				background: true
			},
			// Run once (for CI)
			once: {
				configFile: 'karma.conf.js',
				singleRun: true
			}
		}
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('test', ['jshint', 'karma:once']);
	grunt.registerTask('build', ['preprocess', 'uglify']);
	grunt.registerTask('default', ['build', 'test']);
};
