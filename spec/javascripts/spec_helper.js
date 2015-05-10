// Teaspoon includes some support files, but you can use anything from your
// own support path too.
//= require_tree ./support
//
// PhantomJS (Teaspoons default driver) doesn't have support for
// Function.prototype.bind, which has caused confusion.
// Use this polyfill to avoid the confusion.
//= require support/bind-poly
//
// Deferring execution
// If you're using CommonJS, RequireJS or some other asynchronous library you
// can defer execution. Call Teaspoon.execute() after everything has been
// loaded. Simple example of a timeout:
//
// Teaspoon.defer = true
// setTimeout(Teaspoon.execute, 1000)
//
// Matching files
// By default Teaspoon will look for files that match
// _spec.{js,js.coffee,.coffee}. Add a filename_spec.js file in your
// spec path and it'll be included in the default suite automatically.
// If you want to customize suites, check out the configuration in
// config/initializers/teaspoon.rb
//
// Manifest
// If you'd rather require your spec files manually (to control order for
// instance) you can disable the suite matcher in the configuration and
// use this file as a manifest.
//
// For more information: http://github.com/modeset/teaspoon
//
//
// You can require your own javascript files here. By default this will
// include everything in application, however you may get better load
// performance if you require the specific files that are being used in
// the spec that tests them.
//= require vendor
//= require application
//= require_tree .

(function () {
  'use strict';

  beforeEach(function() {

    module('TodoApp');

    // provide a few commonly used dependencies
    module(function($provide) {
      // provide a default $scope instance
      $provide.factory('$scope', function($rootScope) {
        return $rootScope.$new();
      });
    });

    this.addMatchers({
      toBePromise: function() {
        return this.actual && this.actual.then &&
          typeof this.actual.then === 'function';
      },

      toBeMoment: function(expected, precision) {
        return moment(expected).isSame(this.actual, precision);
      },

      toBeResolved: function() {
        var resolved = false,
            promise = this.actual;

        this.message = function() { return 'expected promise to be resolved'; };

        inject(function($rootScope) {
          promise.then(function() { resolved = true; });
          $rootScope.$digest();
        });

        return resolved;
      },

      toBeRejected: function() {
        var rejected = false,
            promise = this.actual;

        this.message = function() { return 'expected promise to be rejected'; };

        inject(function($rootScope) {
          promise.then(undefined, function() { rejected = true; });
          $rootScope.$digest();
        });

        return rejected;
      },

      toBeResolvedWith: function(expected) {
        var actual,
            resolved = false,
            equals = false,
            promise = this.actual;

        this.message = function() {
          var message = [
            'expected promise to be resolved with: ',
            angular.mock.dump(expected),
            '; '
          ];
          if (resolved) {
            message.push('actually resolved with: ', angular.mock.dump(actual));
          } else {
            message.push('promise was not resolved');
          }
          return message.join('');
        };

        inject(function($rootScope) {
          promise.then(function(_actual_) {
            actual = _actual_;
            resolved = true;
            equals = angular.equals(expected, _actual_);
          });
          $rootScope.$digest();
        });

        return equals;
      }

      // TODO: toBeRejected matcher
    });
  });


  beforeEach(function() {
    module('TodoApp');

    // provide a few commonly used dependencies
    module(function($provide) {

      // provide a default $scope instance
      $provide.factory('$scope', function($rootScope) {
        return $rootScope.$new();
      });
    });

    this.addMatchers({
      toBePromise: function() {
        return this.actual && this.actual.then &&
          typeof this.actual.then === 'function';
      },

      toBeMoment: function(expected, precision) {
        return moment(expected).isSame(this.actual, precision);
      },

      toBeResolved: function() {
        var resolved = false,
            promise = this.actual;

        this.message = function() { return 'expected promise to be resolved'; };

        inject(function($rootScope) {
          promise.then(function() { resolved = true; });
          $rootScope.$digest();
        });

        return resolved;
      },

      toBeRejected: function() {
        var rejected = false,
            promise = this.actual;

        this.message = function() { return 'expected promise to be rejected'; };

        inject(function($rootScope) {
          promise.then(undefined, function() { rejected = true; });
          $rootScope.$digest();
        });

        return rejected;
      },

      toBeResolvedWith: function(expected) {
        var actual,
            resolved = false,
            equals = false,
            promise = this.actual;

        this.message = function() {
          var message = [
            'expected promise to be resolved with: ',
            angular.mock.dump(expected),
            '; '
          ];
          if (resolved) {
            message.push('actually resolved with: ', angular.mock.dump(actual));
          } else {
            message.push('promise was not resolved');
          }
          return message.join('');
        };

        inject(function($rootScope) {
          promise.then(function(_actual_) {
            actual = _actual_;
            resolved = true;
            equals = angular.equals(expected, _actual_);
          });
          $rootScope.$digest();
        });

        return equals;
      }

      // TODO: toBeRejected matcher
    });
  });
})();
