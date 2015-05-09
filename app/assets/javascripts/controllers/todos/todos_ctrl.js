(function () {
  'use strict';

  angular
    .module('TodoApp')
    .controller('TodosCtrl', TodosCtrl);

  TodosCtrl.$inject = [];
  function TodosCtrl() {
    var vm = this;
  }
})();
