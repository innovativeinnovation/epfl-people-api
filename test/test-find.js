/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var should = require('chai').should();
var rewire = require('rewire');

var epflPeopleApi = require('../src/index.js');

describe('epfl-people-api find', function() {

  // Sadly...
  it('shouldn\'t find Taylor Swift', function() {
    return epflPeopleApi.find(
      'Taylor Swift',
      'en'
    ).then(function(res) {
      res.length.should.equal(0);
    });
  });

  it('should find Lindo Duratti', function() {
    return epflPeopleApi.find(
      'Lindo Duratti',
      null
    ).then(function(res) {
      res.length.should.equal(1);
      res[0].sciper.should.equal('128871');
    });
  });

  it('should fail with a wrong service url', function(done) {
    var epflPeopleApiMock = rewire('../src/index.js');
    epflPeopleApiMock.__set__('SEARCH_URL', 'foobar');
    var result = epflPeopleApiMock.find('Lindo', 'en');
    result.then(function(response) {
      should.fail();
      done();
    }).catch(function(reason) {
      done();
    });
  });

});
