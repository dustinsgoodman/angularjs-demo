describe('usersApi', function () {
  'use strict';

  var subject;

  beforeEach(inject(function (_usersApi_) {
    subject = _usersApi_;
  }));

  describe('#create', function () {
    var $httpBackend, usersApiRequest, usersApiResponse;

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;

      usersApiRequest = $httpBackend.whenPOST('/api/v1/auth');
      usersApiResponse = {};
      usersApiRequest.respond(usersApiResponse);
    }));

    it('returns an object with a promise', function () {
      expect(subject.create().$promise).toBePromise();
    });

    it('posts user', function () {
      $httpBackend.expectPOST('/api/v1/auth')
        .respond(usersApiResponse);
      subject.create();
    });

    it('resolves promise when all resources are loaded', function () {
      var promise = subject.create().$promise;
      $httpBackend.flush();

      expect(promise).toBeResolvedWith(usersApiResponse);
    });

    it('rejects promise when a request fails', function () {
      usersApiRequest.respond(401);
      var promise = subject.create().$promise;
      $httpBackend.flush();

      expect(promise).toBeRejected();
    });
  });

  describe('#update', function () {
    var $httpBackend, usersApiRequest, usersApiResponse;

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;

      usersApiRequest = $httpBackend.whenPUT('/api/v1/auth');
      usersApiResponse = {};
      usersApiRequest.respond(usersApiResponse);
    }));

    it('returns an object with a promise', function () {
      expect(subject.update().$promise).toBePromise();
    });

    it('posts user', function () {
      $httpBackend.expectPUT('/api/v1/auth')
        .respond(usersApiResponse);
      subject.update();
    });

    it('resolves promise when all resources are loaded', function () {
      var promise = subject.update().$promise;
      $httpBackend.flush();

      expect(promise).toBeResolvedWith(usersApiResponse);
    });

    it('rejects promise when a request fails', function () {
      usersApiRequest.respond(401);
      var promise = subject.update().$promise;
      $httpBackend.flush();

      expect(promise).toBeRejected();
    });
  });

  describe('#destroy', function () {
    var $httpBackend, usersApiRequest, usersApiResponse;

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;

      usersApiRequest = $httpBackend.whenDELETE('/api/v1/auth');
      usersApiResponse = {};
      usersApiRequest.respond(usersApiResponse);
    }));

    it('returns an object with a promise', function () {
      expect(subject.destroy().$promise).toBePromise();
    });

    it('deletes user', function () {
      $httpBackend.expectDELETE('/api/v1/auth')
        .respond(usersApiResponse);
      subject.destroy();
    });

    it('resolves promise when all resources are loaded', function () {
      var promise = subject.destroy().$promise;
      $httpBackend.flush();

      expect(promise).toBeResolvedWith(usersApiResponse);
    });

    it('rejects promise when a request fails', function () {
      usersApiRequest.respond(401);
      var promise = subject.destroy().$promise;
      $httpBackend.flush();

      expect(promise).toBeRejected();
    });
  });
});
