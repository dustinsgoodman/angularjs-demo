todos = ['Write HTML Document', 'Demonstrate Bindings', 'Demonstrate Directives', 'Show a Controller']

[
  {id: 1, item: 'apples', price: 4.1231, description: 'juicy, red, apple pie'},
  {id: 2, item: 'bananas', price: 1.299, description: 'sweet, yellow, banana split'},
  {id: 3, item: 'oranges', price: 3.1, description: 'tangy, orange, orange juice'},
  {id: 4, item: 'avocados', price: 5.1111111, description: 'tasty, green, guacamole'}
]

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'TodosCtrl',
      templateUrl: '../assets/todos.html'
    })
    .when('/:id', {
      controller: 'TodoCtrl',
      templateUrl: '../assets/todo.html'
    });
});

app.controller('TodosCtrl', function ($scope) {
  $scope.todos = [
    {id: 1, item: 'apples', price: 4.1231, description: 'juicy, red, apple pie'},
    {id: 2, item: 'bananas', price: 1.299, description: 'sweet, yellow, banana split'},
    {id: 3, item: 'oranges', price: 3.1, description: 'tangy, orange, orange juice'},
    {id: 4, item: 'avocados', price: 5.1111111, description: 'tasty, green, guacamole'}
  ];
});

app.controller('TodoCtrl', function ($scope) {
  $scope.todo = {id: 4, item: 'avocados', price: 5.1111111, description: 'tasty, green, guacamole'};

  $scope.myCoolCallback = function () {
    alert('hell yeah!');
  };
});

RestangularProvider.setBaseUrl('/api');
  RestangularProvider.setFullResponse(true);
  RestangularProvider.setDefaultHeaders({
    'X-CSRF-Token': _.find(document.getElementsByTagName("meta"), function (meta) {
      return meta.getAttribute('name') === 'csrf-token';
    }).getAttribute('content')
  });
  RestangularProvider.addRequestInterceptor(function (elem, method, what) {
    if (method === 'post' || method === 'put') {
      var request = {};
      request[what.substring(0, what.length -1)] = elem;
      return request;
    }
    return elem;
  });

app.factory('Todos', function () {
  var todos, getAll, getOne;

  todos = [
    {id: 1, item: 'apples', price: 4.1231, description: 'juicy, red, apple pie'},
    {id: 2, item: 'bananas', price: 1.299, description: 'sweet, yellow, banana split'},
    {id: 3, item: 'oranges', price: 3.1, description: 'tangy, orange, orange juice'},
    {id: 4, item: 'avocados', price: 5.1111111, description: 'tasty, green, guacamole'}
  ];

  getAll = function () {
    return todos;
  };

  getOne = function (id) {
    return _.find(todos, function (todo) { return todo.id === parseInt(id); });
  }

  return {
    index: getAll,
    show: getOne
  };
});

app.directive('zippy', function () {
  return {
    restrict: 'EA',
    replace: true,
    template: '<div><a ng-click="toggleContent()">Title: {{title}}</a><div ng-if="isContentVisible" ng-transclude>content</div></div>',
    transclude: true,
    scope: {
      title: '@',
      callback: '&'
    },
    link: function (scope, elem, attrs) {
      scope.isContentVisible = false;

      scope.toggleContent = function () {
        scope.isContentVisible = !scope.isContentVisible;
        scope.callback();
      };
    }
  };
});