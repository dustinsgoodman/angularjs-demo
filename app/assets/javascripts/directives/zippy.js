(function () {
  'use strict';

  angular
    .module('TodoApp')
    .directive('zippy', zippy);

  zippy.$inject = [];
  function zippy() {
    return {
      restrict: 'EA',
      replace: true,
      template: '<div><a ng-click="toggleContent()">Title: {{title}}</a><div ng-show="isContentVisible" ng-transclude>content</div></div>',
      transclude: true,
      scope: {
        title: '@',
        todo: '=',
        callback: '&'
      },
      link: linker
    };

    function linker(scope, elem, attrs) {
      scope.isContentVisible = false;
      scope.toggleContent = toggleContent;

      function toggleContent() {
        scope.isContentVisible = !scope.isContentVisible;
        scope.callback();
      }
    }
  }
})();
