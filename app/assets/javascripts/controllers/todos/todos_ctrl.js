(function () {
  'use strict';

  angular
    .module('TodoApp')
    .controller('TodosCtrl', TodosCtrl);

  TodosCtrl.$inject = ['todosApi', 'todos'];
  function TodosCtrl(todosApi, todos) {
    var vm = this;
    vm.todos = todos.data;
    vm.createTodo = createTodo;

    function createTodo() {
      todosApi.create({}, vm.form, _success, _error);

      function _success(resp) {
        vm.todos.push(resp.data);
        vm.form.task = '';
        vm.form.description = '';
      }

      function _error() {

      }
    }
  }
})();
