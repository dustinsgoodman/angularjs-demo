(function () {
  'use strict';

  angular
    .module('TodoApp')
    .controller('TodoCtrl', TodoCtrl);

  TodoCtrl.$inject = ['todosApi', 'todo'];
  function TodoCtrl(todosApi, todo) {
    var vm = this;
    vm.todo = todo.data;
    vm.updateTodo = updateTodo;

    function updateTodo() {
      todosApi.update({}, vm.todo, _success, _error);

      function _success() {}

      function _error() {}
    }
  }
})();
