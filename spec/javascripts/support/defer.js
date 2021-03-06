beforeEach(function() {
  'use strict';

  module(function($provide) {
    $provide.factory('$defer', mockDefer);
    $provide.factory('$mockNgResource', mockNgResource);
  });

  function mockDefer($q, $rootScope) {
    return function $defer() {
      var deferred;

      function fn() {
        deferred = $q.defer();
        return deferred.promise;
      }

      fn.$resolve = function() {
        deferred.resolve.apply(undefined, arguments);
        $rootScope.$digest();
      };

      fn.$reject = function() {
        deferred.reject.apply(undefined, arguments);
        $rootScope.$digest();
      };

      return fn;
    };
  }

  function mockNgResource($defer) {
    return function $mockNgResource(isGet) {
      var deferred, fn;
      isGet = !!isGet;

      if (isGet) {
        fn = function (params, success, error) {
          deferred = $defer();
          return { $promise: deferred().then(success, error) };
        };
      } else {
        fn = function (params, postData, success, error) {
          deferred = $defer();
          return { $promise: deferred().then(success, error) };
        };
      }

      fn.$resolve = function () {
        deferred.$resolve.apply(undefined, arguments);
      };

      fn.$reject = function () {
        deferred.$reject.apply(undefined, arguments);
      };

      return fn;
    };
  }
});
