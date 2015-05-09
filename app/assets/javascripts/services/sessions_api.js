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
    return $resource('/api/v1/auth/sign_in', null, {
      'create': {
        method: 'POST',
        headers: headers,
        transformRequest: function(data) {
          return angular.toJson({session: data});
        }
      },
      'update': {
        method: 'PUT',
        headers: headers
      },
      'destroy': {
        method: 'DELETE',
        headers: headers
      }
    });
  }
})();

