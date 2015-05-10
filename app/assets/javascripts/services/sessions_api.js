(function () {
  'use strict';

  angular
    .module('TodoApp')
    .factory('sessionsApi', sessionsApi);

  sessionsApi.$inject = ['$resource'];
  function sessionsApi($resource) {
    var headers = {
      'Accept': 'application/json'
    };
    return $resource('/api/v1/auth/:action', null, {
      'create': {
        method: 'POST',
        headers: headers,
        params: {
          action: 'sign_in'
        }
      },
      'destroy': {
        method: 'DELETE',
        headers: headers,
        params: {
          action: 'sign_out'
        }
      }
    });
  }
})();

