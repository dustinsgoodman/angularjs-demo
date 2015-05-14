describe('TodosCtrl', function () {
  'use strict';

  var vm, $controller, todosApi, todos;

  beforeEach(function () {
    module(function ($provide) {
      $provide.factory('todosApi', mockTodosApi);
      $provide.value('todos', mockTodos);
    });
  });

  beforeEach(inject(function (_$controller_, _todosApi_, _todos_) {
    $controller = _$controller_;
    todosApi = _todosApi_;
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
    describe('vm.createTodo()', function () {
      it('calls create on todosApi', function () {
        spyOn(todosApi, 'create').andCallThrough();
        vm.createTodo();
        expect(todosApi.create).toHaveBeenCalled();
      });
    });
  });

  function mockTodos() {
    return {
      data: []
    };
  }

  function mockTodosApi($mockNgResource) {
    return {
      create: $mockNgResource(false)
    };
  }
});
