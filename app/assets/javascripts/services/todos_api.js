(function () {
  'use strict';

  angular
    .module('TodoApp')
    .factory('todosApi', todosApi);

  todosApi.$inject = ['Restangular'];
  function todosApi(Restangular) {
    var TodoRestangular = Restangular.withConfig(todoRestConfig);

    todoRestConfig.$inject = ['RestangularConfigurer'];
    function todoRestConfig(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('/api/v1');
      RestangularConfigurer.setDefaultHeaders({
        'Accept': 'application/json'
      });
    }

    return {
      index: index,
      create: create,
      show: show,
      update: update,
      destroy: destroy
    };

    function index(params, successCallback, errorCallback) {
      var promise = TodoRestangular.all('todos').getList(params);
      promise.then(successCallback, errorCallback);
      return promise;
    }

    function create(params, data, successCallback, errorCallback) {
      var promise = TodoRestangular.all('todos').post(data, params);
      promise.then(successCallback, errorCallback);
      return promise;
    }

    function show(params, successCallback, errorCallback) {
      var promise = TodoRestangular
        .one('todos', params.id)
        .get(_.omit(params, 'id'));
      promise.then(successCallback, errorCallback);
      return promise;
    }

    function update(params, data, successCallback, errorCallback) {
      var promise = data.put(params);
      promise.then(successCallback, errorCallback);
      return promise;
    }

    function destroy(params, successCallback, errorCallback) {
      var promise = params.remove();
      promise.then(successCallback, errorCallback);
      return promise;
    }
  }
})();
