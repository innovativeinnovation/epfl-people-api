/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var should = require('chai').should();
var rewire = require('rewire');

var epflPeopleApi = require('../src/index.js');

describe('epfl-people-api findBySciper', function() {

  it('should throw an exception with sciper xxx', function() {
    return epflPeopleApi.findBySciper('xxx', 'en').then(function() {
    }).catch(function(err) {
      err.message.should.equal('Expected a sciper');
    });
  });

  it('should throw an exception with sciper 69', function() {
    return epflPeopleApi.findBySciper(69, 'en').then(function() {
    }).catch(function(err) {
      err.message.should.equal('Expected a sciper');
    });
  });

  it('should throw an exception with sciper 1000051', function() {
    return epflPeopleApi.findBySciper(1000051, 'en').then(function() {
    }).catch(function(err) {
      err.message.should.equal('Expected a sciper');
    });
  });

  it('should throw an exception with sciper 100000', function() {
    return epflPeopleApi.findBySciper(100000, 'en').then(function() {
    }).catch(function(err) {
      err.message.should.equal('Sciper does not exist');
    });
  });

  it('should fail with a wrong service url', function(done) {
    var epflPeopleApiMock = rewire('../src/index.js');
    epflPeopleApiMock.__set__('SEARCH_URL', 'foobar');
    var result = epflPeopleApiMock.findBySciper(280556, 'en');
    result.then(function(response) {
      should.fail();
      done();
    }).catch(function(reason) {
      done();
    });
  });

  it('should find sciper 128871 in en', function() {
    return epflPeopleApi.findBySciper(128871, 'en').then(function(res) {
      res.name.should.equal('Duratti');
      res.firstname.should.equal('Lindo');
      res.office.should.equal('INN 015');
      res.position.should.equal('Computer Scientist');
    });
  });

  it('should find sciper 128871 in fr', function() {
    return epflPeopleApi.findBySciper(128871, 'fr').then(function(res) {
      res.position.should.equal('Informaticien');
    });
  });

  it('should find sciper 157489', function() {
    return epflPeopleApi.findBySciper(157489, null).then(function(res) {
      res.name.should.equal('Boatto');
      res.firstname.should.equal('Laurent');
      res.office.should.equal('MA B0 519');
    });
  });

});
