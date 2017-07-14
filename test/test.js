/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var should = require('chai').should();
var rewire = require('rewire');

var epflPeopleApi = require('../src/index.js');

describe('epfl-people-api module', function() {

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

  it('should find sciper 128871', function() {
    return epflPeopleApi.findBySciper(128871, 'en').then(function(res) {
      res[0].name.should.equal('Duratti');
      res[0].firstname.should.equal('Lindo');
      res[0].office.should.equal('INN 015');
    });
  });

  it('should find sciper 157489', function() {
    return epflPeopleApi.findBySciper(157489, null).then(function(res) {
      res[0].name.should.equal('Boatto');
      res[0].firstname.should.equal('Laurent');
      res[0].office.should.equal('INN 014');
    });
  });

});
