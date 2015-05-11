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

  describe('#tokenFormat', function () {
    it('should return the tokenFormat object', function () {
      expect(subject.tokenFormat()).toEqual({
        'access-token': '{{ token }}',
        'token-type': 'Bearer',
        'client': '{{ clientId }}',
        'expiry': '{{ expiry }}',
        'uid': '{{ uid }}'
      });
    });
  });

  describe('#setAuthHeaders', function () {
    var result;
    beforeEach(function () {
      result = { data: 'test' };
    });

    it('sets the localStorage persistance of the new headers', function () {
      subject.setAuthHeaders(result);
      expect(
        JSON.parse($window.localStorage.getItem('auth_headers'))
      ).toEqual(result);
    });

    it('returns the new headers', function () {
      expect(subject.setAuthHeaders(result)).toEqual(result);
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
