(function () {
  'use strict';

  angular
    .module('TodoApp')
    .factory('todosApi', todosApi);

  todosApi.$inject = ['$resource'];
  function todosApi($resource) {
    var headers = {
      'Accept': 'application/json'
    };
    return $resource('/api/v1/todos/:id', null, {
      'index': {
        method: 'GET',
        headers: headers
      },
      'create': {
        method: 'POST',
        headers: headers,
        transformRequest: function(data) {
          return angular.toJson({todo: data});
        }
      },
      'show': {
        method: 'GET',
        headers: headers,
        params: {
          id: '@id'
        }
      },
      'update': {
        method: 'PUT',
        headers: headers,
        params: {
          id: '@id'
        }
      },
      'destroy': {
        method: 'DELETE',
        headers: headers,
        params: {
          id: '@id'
        }
      }
    });
  }
})();
