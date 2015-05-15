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
    vm.removeTodo = removeTodo;

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

    function removeTodo(todo) {
      todosApi.destroy({}, todo, _success, _error);

      function _success() {
        vm.todos.splice(_.indexOf(_.pluck(vm.todos, 'id'), todo.id), 1);
      }

      function _error() {}
    }
  }
})();
