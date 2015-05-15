(function () {
  'use strict';

  angular
    .module('TodoApp')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$location', 'sessionsApi'];
  function LoginCtrl($location, sessionsApi) {
    var vm = this;
    vm.loginForm = {
      email: '',
      password: ''
    };
    vm.invalidLogin = false;
    vm.submitLogin = submitLogin;

    function submitLogin() {
      sessionsApi.create({}, vm.loginForm, _success, _error);

      function _success() {
        $location.path('/');
      }

      function _error(resp) {
        vm.invalidLogin = true;
      }
    }
  }
})();
