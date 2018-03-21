/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017-2018.
 * See the LICENSE file for more details.
 */

var should = require('chai').should();
var rewire = require('rewire');

var epflPeopleApi = require('../src/index.js');

describe('epfl-people-api hasPhoto', function () {
  it('should throw an exception with sciper xxx', function () {
    return epflPeopleApi.hasPhoto('xxx', 'en').then(function () {
    }).catch(function (err) {
      err.message.should.equal('Expected a sciper');
    });
  });

  it('should throw an exception with sciper 69', function () {
    return epflPeopleApi.hasPhoto(69, 'en').then(function () {
    }).catch(function (err) {
      err.message.should.equal('Expected a sciper');
    });
  });

  it('should throw an exception with sciper 1000051', function () {
    return epflPeopleApi.hasPhoto(1000051, 'en').then(function () {
    }).catch(function (err) {
      err.message.should.equal('Expected a sciper');
    });
  });

  it('should fail with a wrong service url', function (done) {
    var epflPeopleApiMock = rewire('../src/index.js');
    epflPeopleApiMock.__set__('PHOTO_URL', 'foobar');
    var result = epflPeopleApiMock.hasPhoto(280556, 'en');
    result.then(function (response) {
      should.fail();
      done();
    }).catch(function (reason) {
      done();
    });
  });

  it('shouldn\'t find photo of Lindo Duratti', function () {
    return epflPeopleApi.hasPhoto(128871).then(function (hasPhoto) {
      hasPhoto.should.equal(false);
    });
  });

  it('should find photo of Mathilda Jeanneret', function () {
    return epflPeopleApi.hasPhoto(275746).then(function (hasPhoto) {
      hasPhoto.should.equal(true);
    });
  });
});
