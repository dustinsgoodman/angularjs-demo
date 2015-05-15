describe('TodosCtrl', function () {
  'use strict';

  var vm, $controller, todosApi, todos, todoResult;

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

      describe('after request finishes', function () {
        describe('and it succeeds', function () {
          beforeEach(function () {
            vm.todos = [];
            vm.form = {};
            vm.createTodo();
            todoResult = {
              data: {}
            };
            todosApi.create.$resolve(todoResult);
          });

          it('sets vm.form to default', function () {
            expect(vm.form).toEqual({
              task: '',
              description: ''
            });
          });

          it('adds result to vm.todos', function () {
            expect(vm.todos).toEqual([{}]);
          });
        });

        describe('and it fails', function () {
          // @TODO: TBD
        });
      });
    });

    describe('vm.removeTodo()', function () {
      it('calls destroy on todosApi', function () {
        spyOn(todosApi, 'destroy').andCallThrough();
        vm.removeTodo();
        expect(todosApi.destroy).toHaveBeenCalled();
      });

      describe('after request finishes', function () {
        describe('and it succeeds', function () {
          beforeEach(function () {
            var todo = { id: 1 };
            vm.todos = [todo];
            vm.removeTodo(todo);
            todosApi.destroy.$resolve();
          });

          it('removes todo from vm.todos', function () {
            expect(vm.todos).toEqual([]);
          });
        });

        describe('and it fails', function () {
          // @TODO: TBD
        });
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
      create: $mockNgResource(false),
      destroy: $mockNgResource(false)
    };
  }
});
