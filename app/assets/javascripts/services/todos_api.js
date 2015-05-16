(function () {
  'use strict';

  angular
    .module('TodoApp')
    .factory('todosApi', todosApi);

  todosApi.$inject = ['$q', '$http'];
  function todosApi($q, $http) {
    var headers = {
      'Accept': 'application/json'
    };
    return {
      index: index,
      create: create,
      show: show,
      update: update,
      destroy: destroy
    };

    function index(params, successCallback, errorCallback) {
      var deferred = $q.defer();
      $http.get('/api/v1/todos', {
        headers: headers,
        params: params
      }).success(_handleResponse).error(_handleError);
      return deferred.promise;

      function _handleResponse(resp) {
        if (!!successCallback) {
          successCallback(resp);
        }
        deferred.resolve(resp);
      }

      function _handleError(resp) {
        if (!!errorCallback) {
          errorCallback(resp);
        }
        deferred.reject(resp);
      }
    }

    function create(params, data, successCallback, errorCallback) {
      var deferred = $q.defer();
      $http.post('/api/v1/todos', {
        todo: data
      }, {
        headers: headers,
        params: params
      }).success(_handleResponse).error(_handleError);
      return deferred.promise;

      function _handleResponse(resp) {
        if (!!successCallback) {
          successCallback(resp);
        }
        deferred.resolve(resp);
      }

      function _handleError(resp) {
        if (!!errorCallback) {
          errorCallback(resp);
        }
        deferred.reject(resp);
      }
    }

    function show(params, successCallback, errorCallback) {
      var deferred = $q.defer();
      $http.get('/api/v1/todos/' + params.id, {
        headers: headers,
        params: _.omit(params, 'id')
      }).success(_handleResponse).error(_handleError);
      return deferred.promise;

      function _handleResponse(resp) {
        if (!!successCallback) {
          successCallback(resp);
        }
        deferred.resolve(resp);
      }

      function _handleError(resp) {
        if (!!errorCallback) {
          errorCallback(resp);
        }
        deferred.reject(resp);
      }
    }

    function update(params, data, successCallback, errorCallback) {
      var deferred = $q.defer();
      $http.put('/api/v1/todos/' + data.id, {
        todo: data
      }, {
        headers: headers,
        params: _.omit(params, 'id')
      }).success(_handleResponse).error(_handleError);
      return deferred.promise;

      function _handleResponse(resp) {
        if (!!successCallback) {
          successCallback(resp);
        }
        deferred.resolve(resp);
      }

      function _handleError(resp) {
        if (!!errorCallback) {
          errorCallback(resp);
        }
        deferred.reject(resp);
      }
    }

    function destroy(params, successCallback, errorCallback) {
      var deferred = $q.defer();
      $http.delete('/api/v1/todos/' + params.id, {
        headers: headers,
        params: _.omit(params, 'id')
      }).success(_handleResponse).error(_handleError);
      return deferred.promise;

      function _handleResponse(resp) {
        if (!!successCallback) {
          successCallback(resp);
        }
        deferred.resolve(resp);
      }

      function _handleError(resp) {
        if (!!errorCallback) {
          errorCallback(resp);
        }
        deferred.reject(resp);
      }
    }
  }
})();
