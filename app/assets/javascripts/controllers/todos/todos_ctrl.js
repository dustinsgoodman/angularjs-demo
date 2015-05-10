(function () {
  'use strict';

  angular
    .module('TodoApp')
    .controller('TodosCtrl', TodosCtrl);

  TodosCtrl.$inject = ['todos'];
  function TodosCtrl(todos) {
    var vm = this;
    vm.todos = todos.data;
  }
})();
