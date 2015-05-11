describe('TodosCtrl', function () {
  'use strict';

  var vm, $controller, todos;

  beforeEach(function () {
    module(function ($provide) {
      $provide.value('todos', mockTodos);
    });
  });

  beforeEach(inject(function (_$controller_, _todos_) {
    $controller = _$controller_;
    todos = _todos_;

    vm = $controller('TodosCtrl');
  }));

  describe('initialization', function () {
    describe('initial values', function () {
      it('sets vm.todos to todos.data', function () {
        expect(vm.todos).toEqual(todos.data);
      });
    });
  });

  describe('functions', function () {
  });

  function mockTodos() {
    return {
      data: []
    };
  }
});
