describe('LoginCtrl', function () {
  'use strict';

  var vm, $controller, $location, sessionsApi;

  beforeEach(function () {
    module(function ($provide) {
      $provide.factory('sessionsApi', mockSessionsApi);
    });
  });

  beforeEach(inject(function (_$controller_, _$location_, _sessionsApi_) {
    $controller = _$controller_;
    $location = _$location_;
    sessionsApi = _sessionsApi_;

    vm = $controller('LoginCtrl');
  }));

  describe('initialization', function () {
    describe('initial values', function () {
      it('sets vm.loginForm to default', function () {
        expect(vm.loginForm).toEqual({
          email: '',
          password: ''
        });
      });

      it('sets vm.invalidLogin to false', function () {
        expect(vm.invalidLogin).toBeFalsy();
      });
    });
  });

  describe('functions', function () {
    describe('vm.submitLogin()', function () {
      it('calls create on sessionsApi', function () {
        spyOn(sessionsApi, 'create').andCallThrough();
        vm.submitLogin();
        expect(sessionsApi.create).toHaveBeenCalledWith(
          vm.loginForm, jasmine.any(Function), jasmine.any(Function)
        );
      });

      describe('when it succeeds', function () {
        beforeEach(function () {
          spyOn($location, 'path').andCallThrough();
          vm.submitLogin();
          sessionsApi.create.$resolve();
        });

        it('changes the route to /', function () {
          expect($location.path).toHaveBeenCalledWith('/');
        });
      });

      describe('when it fails', function () {
        beforeEach(function () {
          vm.submitLogin();
          sessionsApi.create.$reject();
        });

        it('sets vm.invalidLogin to true', function () {
          expect(vm.invalidLogin).toBeTruthy();
        });
      });
    });
  });

  function mockSessionsApi($mockNgResource) {
    return {
      create: $mockNgResource()
    };
  }
});
