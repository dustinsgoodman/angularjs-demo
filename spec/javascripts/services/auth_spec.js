describe('auth', function () {
  'use strict';

  var subject, $window;

  beforeEach(inject(function (_$window_, _auth_) {
    $window = _$window_;
    subject = _auth_;
  }));

  afterEach(function () {
    $window.localStorage.removeItem('auth_headers');
  });

  describe('#updateHeadersFromResponse', function () {
    var resp;

    describe('when the token is current', function () {
      beforeEach(function () {
        $window.localStorage.setItem('auth_headers', JSON.stringify({expiry: 10}));
        resp = {
          headers: jasmine.createSpy('headers').andReturn(100)
        };
      });

      it('sets the localStorage persistance of the new headers', function () {
        subject.updateHeadersFromResponse(resp);
        expect(
          JSON.parse($window.localStorage.getItem('auth_headers'))
        ).toEqual({
          'access-token': 100,
          'token-type': 100,
          'client': 100,
          'expiry': 100,
          'uid' : 100
        });
      });
    });

    describe('when the token is expired', function () {
      beforeEach(function () {
        $window.localStorage.setItem('auth_headers', JSON.stringify({expiry: 100}));
        resp = {
          headers: jasmine.createSpy('headers').andReturn(10)
        };
      });

      it('does not change the localStorage persistance', function () {
        subject.updateHeadersFromResponse(resp);
        expect(
          JSON.parse($window.localStorage.getItem('auth_headers'))
        ).toEqual({
          'expiry': 100,
        });
      });
    });
  });

  describe('#getAuthHeaders', function () {
    describe('when auth_headers are not in localStorage', function () {
      it('should return an empty object', function () {
        expect(subject.getAuthHeaders()).toEqual({});
      });
    });

    describe('when auth_headers are in localStorage', function () {
      var result;
      beforeEach(function () {
        result = { data: 'test' };
        $window.localStorage.setItem('auth_headers', JSON.stringify(result));
      });

      it('should return result', function () {
        expect(subject.getAuthHeaders()).toEqual(result);
      });
    });
  });

  describe('#getExpiry', function () {
    var result;
    beforeEach(function () {
      result = { expiry: '10' };
      $window.localStorage.setItem('auth_headers', JSON.stringify(result));
    });

    it('returns the expiry', function () {
      expect(subject.getExpiry()).toEqual(10000);
    });
  });

  describe('#parseExpiry', function () {
    describe('when headers contains expiry', function () {
      it('should return the expiry in ms', function () {
        expect(subject.parseExpiry({ expiry: '10' })).toEqual(10000);
      });
    });

    describe('when headers does not contain expiry', function () {
      it('should return null', function () {
        expect(subject.parseExpiry({})).toBeNull();
      });
    });
  });
});
