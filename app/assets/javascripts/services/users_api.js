(function () {
  'use strict';

  angular
    .module('TodoApp')
    .factory('usersApi', usersApi);

  usersApi.$inject = ['$resource'];
  function usersApi($resource) {
    var headers = {
      'Accept': 'application/json'
    };
    return $resource('/api/v1/auth', null, {
      'create': {
        method: 'POST',
        headers: headers,
        transformRequest: function(data) {
          return angular.toJson({user: data});
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

