describe('TodoCtrl', function () {
  'use strict';

  var vm, $controller, todosApi, todo;

  beforeEach(function () {
    module(function ($provide) {
      $provide.factory('todosApi', mockTodosApi);
      $provide.value('todo', mockTodo);
    });
  });

  beforeEach(inject(function (_$controller_, _todosApi_, _todo_) {
    $controller = _$controller_;
    todosApi = _todosApi_;
    todo = _todo_;

    vm = $controller('TodoCtrl');
  }));

  describe('initialization', function () {
    describe('initial values', function () {
      it('sets vm.todo to todo.data', function () {
        expect(vm.todo).toEqual(todo.data);
      });
    });
  });

  describe('functions', function () {
    describe('vm.updateTodo()', function () {
      it('calls update on todosApi', function () {
        spyOn(todosApi, 'update').andCallThrough();
        vm.updateTodo();
        expect(todosApi.update).toHaveBeenCalled();
      });

      describe('after request finishes', function () {
        describe('and it succeeds', function () {
          // @TODO: TBD
        });

        describe('and it fails', function () {
          // @TODO: TBD
        });
      });
    });
  });

  function mockTodo() {
    return {
      data: { id: 1 }
    };
  }

  function mockTodosApi($mockNgResource) {
    return {
      update: $mockNgResource(false)
    };
  }
});
