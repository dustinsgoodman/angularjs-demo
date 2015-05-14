(function () {
  'use strict';

  angular
    .module('TodoApp')
    .factory('auth', auth);

  auth.$inject = ['$window'];
  function auth($window) {
    var tokenFormat, api;

    tokenFormat = {
      'access-token': '{{ token }}',
      'token-type': 'Bearer',
      'client': '{{ clientId }}',
      'expiry': '{{ expiry }}',
      'uid': '{{ uid }}'
    };
    api = {
      getAuthHeaders: getAuthHeaders,
      getExpiry: getExpiry,
      parseExpiry: parseExpiry,
      updateHeadersFromResponse: updateHeadersFromResponse
    };
    return api;

    function _setAuthHeaders(newHeaders) {
      var result;
      result = angular.extend(_retrieveData('auth_headers'), newHeaders);
      _persistData('auth_headers', result);
      return result;
    }

    function getAuthHeaders() {
      return _retrieveData('auth_headers');
    }

    function updateHeadersFromResponse(resp) {
      var newHeaders = {};
      _.each(tokenFormat, function (val, key) {
        if (resp.headers(key)) {
          newHeaders[key] = resp.headers(key);
        }
      });

      if (_tokenIsCurrent(newHeaders)) {
        return _setAuthHeaders(newHeaders);
      }
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

    function _tokenIsCurrent(headers) {
      var newTokenExpiry, oldTokenExpiry;
      oldTokenExpiry = Number(getExpiry());
      newTokenExpiry = Number(parseExpiry(headers || {}));
      return newTokenExpiry >= oldTokenExpiry;
    }
  }
})();
