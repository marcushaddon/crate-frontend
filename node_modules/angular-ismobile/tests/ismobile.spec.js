'use strict';

// Disable JSHint: "Expected an assignment or function call and instead saw an expression."
// Otherwise JSHint dislikes ChaiJS
/*jshint -W030 */

var expect = chai.expect;

describe('angular-ismobile', function () {
	describe('Midway: Module ismobile', function () {});
	describe('Unit: isMobile', function () {
		describe('Run phase', function () {
			var service;

			beforeEach(function () {
				module('ismobile');
			});
			beforeEach(inject(function (isMobile) {
				service = isMobile;
			}));

			it('should be injected and have .apple.phone as a minimum', function () {
				expect(service).to.not.be.undefined;
				expect(service.apple.phone).to.exist;
			});
		});

		describe('Configuration phase', function () {
			var provider;

			beforeEach(function () {
				angular.module('test.ismobile', ['ismobile'])
					.config(function (isMobileProvider) {
						provider = isMobileProvider;
					});

				module('test.ismobile', 'ismobile');
				inject();
			});

			it('should be injected and have .apple.phone as a minimum', function () {
				expect(provider).to.not.be.undefined;
				expect(provider.apple.phone).to.exist;
			});
		});
	});
});