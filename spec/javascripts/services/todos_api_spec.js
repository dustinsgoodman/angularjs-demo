describe('todosApi', function () {
  'use strict';

  var subject, defaultResponse;

  defaultResponse = {
    'data': [],
    'status': 200,
    'config': {
      'method': 'GET',
      'transformRequest': [
      null
      ],
      'transformResponse': [
      null
      ],
      'headers': {
        'Accept': 'application/json',
        'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT'
      },
      'url': '/api/v1/todos'
    },
    'statusText': ''
  };

  beforeEach(inject(function (_todosApi_) {
    subject = _todosApi_;
  }));

  describe('#index', function () {
    var $httpBackend, todosApiRequest, todosApiResponse;

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;

      todosApiRequest = $httpBackend.whenGET('/api/v1/todos');
      todosApiResponse = defaultResponse;
      todosApiRequest.respond(todosApiResponse);
    }));

    it('returns a promise', function () {
      expect(subject.index()).toBePromise();
    });

    it('gets todos', function () {
      $httpBackend.expectGET('/api/v1/todos')
        .respond(todosApiResponse);
      subject.index();
    });

    it('resolves promise when all resources are loaded', function () {
      var promise = subject.index();
      $httpBackend.flush();
      expect(promise).toBeResolvedWith(todosApiResponse);
    });

    it('rejects promise when a request fails', function () {
      todosApiRequest.respond(401);
      var promise = subject.index();
      $httpBackend.flush();

      expect(promise).toBeRejected();
    });
  });

  describe('#create', function () {
    var $httpBackend, todosApiRequest, todosApiResponse;

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;

      todosApiRequest = $httpBackend.whenPOST('/api/v1/todos');
      todosApiResponse = defaultResponse;
      todosApiRequest.respond(todosApiResponse);
    }));

    it('returns a promise', function () {
      expect(subject.create()).toBePromise();
    });

    it('posts todo', function () {
      $httpBackend.expectPOST('/api/v1/todos')
        .respond(todosApiResponse);
      subject.create();
    });

    it('resolves promise when all resources are loaded', function () {
      var promise = subject.create();
      $httpBackend.flush();

      expect(promise).toBeResolvedWith(todosApiResponse);
    });

    it('rejects promise when a request fails', function () {
      todosApiRequest.respond(401);
      var promise = subject.create();
      $httpBackend.flush();

      expect(promise).toBeRejected();
    });
  });

  describe('#show', function () {
    var $httpBackend, todosApiRequest, todosApiResponse;

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;

      todosApiRequest = $httpBackend.whenGET('/api/v1/todos/1');
      todosApiResponse = {};
      todosApiRequest.respond(todosApiResponse);
    }));

    it('returns a promise', function () {
      expect(subject.show({ id: 1 })).toBePromise();
    });

    it('gets todo', function () {
      $httpBackend.expectGET('/api/v1/todos/1')
        .respond(todosApiResponse);
      subject.show({ id: 1 });
    });

    it('resolves promise when all resources are loaded', function () {
      var promise = subject.show({ id: 1 });
      $httpBackend.flush();

      expect(promise).toBeResolvedWith(todosApiResponse);
    });

    it('rejects promise when a request fails', function () {
      todosApiRequest.respond(401);
      var promise = subject.show({ id: 1 });
      $httpBackend.flush();

      expect(promise).toBeRejected();
    });
  });

  describe('#update', function () {
    var $httpBackend, todosApiRequest, todosApiResponse;

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;

      todosApiRequest = $httpBackend.whenPUT('/api/v1/todos/1');
      todosApiResponse = {};
      todosApiRequest.respond(todosApiResponse);
    }));

    it('returns a promise', function () {
      expect(subject.update({ id: 1 })).toBePromise();
    });

    it('puts todo', function () {
      $httpBackend.expectPUT('/api/v1/todos/1')
        .respond(todosApiResponse);
      subject.update({ id: 1 });
    });

    it('resolves promise when all resources are loaded', function () {
      var promise = subject.update({ id: 1 });
      $httpBackend.flush();

      expect(promise).toBeResolvedWith(todosApiResponse);
    });

    it('rejects promise when a request fails', function () {
      todosApiRequest.respond(401);
      var promise = subject.update({ id: 1 });
      $httpBackend.flush();

      expect(promise).toBeRejected();
    });
  });

  describe('#destroy', function () {
    var $httpBackend, todosApiRequest, todosApiResponse;

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;

      todosApiRequest = $httpBackend.whenDELETE('/api/v1/todos/1');
      todosApiResponse = {};
      todosApiRequest.respond(todosApiResponse);
    }));

    it('returns a promise', function () {
      expect(subject.destroy({ id: 1 })).toBePromise();
    });

    it('deletes user', function () {
      $httpBackend.expectDELETE('/api/v1/todos/1')
        .respond(todosApiResponse);
      subject.destroy({ id: 1 });
    });

    it('resolves promise when all resources are loaded', function () {
      var promise = subject.destroy({ id: 1 });
      $httpBackend.flush();

      expect(promise).toBeResolvedWith(todosApiResponse);
    });

    it('rejects promise when a request fails', function () {
      todosApiRequest.respond(401);
      var promise = subject.destroy({ id: 1 });
      $httpBackend.flush();

      expect(promise).toBeRejected();
    });
  });
});
