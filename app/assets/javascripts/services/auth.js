(function () {
  'use strict';

  angular
    .module('TodoApp')
    .factory('auth', auth);

  auth.$inject = ['$window'];
  function auth($window) {
    return {
      tokenFormat: tokenFormat,
      setAuthHeaders: setAuthHeaders,
      getAuthHeaders: getAuthHeaders,
      getExpiry: getExpiry,
      parseExpiry: parseExpiry
    };

    function tokenFormat() {
      return {
        'access-token': '{{ token }}',
        'token-type': 'Bearer',
        'client': '{{ clientId }}',
        'expiry': '{{ expiry }}',
        'uid': '{{ uid }}'
      };
    }

    function setAuthHeaders(newHeaders) {
      var result;
      result = angular.extend(_retrieveData('auth_headers'), newHeaders);
      _persistData('auth_headers', result);
      return result;
    }

    function getAuthHeaders() {
      return _retrieveData('auth_headers');
    }

    function getExpiry() {
      return parseExpiry(_retrieveData('auth_headers'));
    }

    function parseExpiry(headers) {
      return (parseInt(headers['expiry'], 10) * 1000) || null;
    }

    function _persistData(key, val) {
      $window.localStorage.setItem(key, JSON.stringify(val));
    }

    function _retrieveData(key) {
      return JSON.parse($window.localStorage.getItem(key)) || {};
    }
  }
})();
