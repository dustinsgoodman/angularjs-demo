(function () {
  'use strict';

  angular
    .module('TodoApp')
    .controller('RegisterCtrl', RegisterCtrl);

  RegisterCtrl.$inject = ['$location', 'usersApi'];
  function RegisterCtrl($location, usersApi) {
    var vm = this;
    vm.user = {
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'password_confirmation': ''
    };
    vm.submitRegistration = submitRegistration;

    function submitRegistration() {
      usersApi.create({}, vm.user, _success, _error);

      function _success() {
        $location.path('/login');
      }

      function _error(resp) {

      }
    }
  }
})();
