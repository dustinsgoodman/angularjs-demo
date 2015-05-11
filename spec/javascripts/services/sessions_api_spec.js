describe('sessionsApi', function () {
  'use strict';

  var subject;

  beforeEach(inject(function (_sessionsApi_) {
    subject = _sessionsApi_;
  }));

  describe('#create', function () {
    var $httpBackend, sessionsApiRequest, sessionsApiResponse;

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;

      sessionsApiRequest = $httpBackend.whenPOST('/api/v1/auth/sign_in');
      sessionsApiResponse = {};
      sessionsApiRequest.respond(sessionsApiResponse);
    }));

    it('returns an object with a promise', function () {
      expect(subject.create().$promise).toBePromise();
    });

    it('posts session', function () {
      $httpBackend.expectPOST('/api/v1/auth/sign_in')
        .respond(sessionsApiResponse);
      subject.create();
    });

    it('resolves promise when all resources are loaded', function () {
      var promise = subject.create().$promise;
      $httpBackend.flush();

      expect(promise).toBeResolvedWith(sessionsApiResponse);
    });

    it('rejects promise when a request fails', function () {
      sessionsApiRequest.respond(401);
      var promise = subject.create().$promise;
      $httpBackend.flush();

      expect(promise).toBeRejected();
    });
  });

  describe('#destroy', function () {
    var $httpBackend, sessionsApiRequest, sessionsApiResponse;

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;

      sessionsApiRequest = $httpBackend.whenDELETE('/api/v1/auth/sign_out');
      sessionsApiResponse = {};
      sessionsApiRequest.respond(sessionsApiResponse);
    }));

    it('returns an object with a promise', function () {
      expect(subject.destroy().$promise).toBePromise();
    });

    it('deletes session', function () {
      $httpBackend.expectDELETE('/api/v1/auth/sign_out')
        .respond(sessionsApiResponse);
      subject.destroy();
    });

    it('resolves promise when all resources are loaded', function () {
      var promise = subject.destroy().$promise;
      $httpBackend.flush();

      expect(promise).toBeResolvedWith(sessionsApiResponse);
    });

    it('rejects promise when a request fails', function () {
      sessionsApiRequest.respond(401);
      var promise = subject.destroy().$promise;
      $httpBackend.flush();

      expect(promise).toBeRejected();
    });
  });
});
