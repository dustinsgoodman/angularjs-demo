(function () {
  'use strict';

  angular
    .module('TodoApp')
    .controller('TodoCtrl', TodoCtrl);

  TodoCtrl.$inject = ['todo'];
  function TodoCtrl(todo) {
    var vm = this;
    vm.todo = todo.data;
  }
})();
