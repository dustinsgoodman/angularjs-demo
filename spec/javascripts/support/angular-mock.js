/*
 *= require angular
 *= require angular-mocks
 */

afterEach(inject(function ($httpBackend) {
  $httpBackend.verifyNoOutstandingExpectation();
}));

