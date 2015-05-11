describe('RegisterCtrl', function () {
  'use strict';

  var vm, $controller, $location, usersApi;

  beforeEach(function () {
    module(function ($provide) {
      $provide.factory('usersApi', mockUsersApi);
    });
  });

  beforeEach(inject(function (_$controller_, _$location_, _usersApi_) {
    $controller = _$controller_;
    $location = _$location_;
    usersApi = _usersApi_;

    vm = $controller('RegisterCtrl');
  }));

  describe('initialization', function () {
    describe('initial values', function () {
      it('sets vm.user to default', function () {
        expect(vm.user).toEqual({
          'first_name': '',
          'last_name': '',
          'email': '',
          'password': '',
          'password_confirmation': ''
        });
      });
    });
  });

  describe('functions', function () {
    describe('vm.submitRegistration()', function () {
      it('calls create on usersApi', function () {
        spyOn(usersApi, 'create').andCallThrough();
        vm.submitRegistration();
        expect(usersApi.create).toHaveBeenCalledWith(
          vm.user, jasmine.any(Function), jasmine.any(Function)
        );
      });

      describe('when it succeeds', function () {
        beforeEach(function () {
          spyOn($location, 'path').andCallThrough();
          vm.submitRegistration();
          usersApi.create.$resolve();
        });

        it('changes the route to /', function () {
          expect($location.path).toHaveBeenCalledWith('/login');
        });
      });

      describe('when it fails', function () {
        beforeEach(function () {
          vm.submitRegistration();
          usersApi.create.$reject();
        });
      });
    });
  });

  function mockUsersApi($mockNgResource) {
    return {
      create: $mockNgResource()
    };
  }
});
