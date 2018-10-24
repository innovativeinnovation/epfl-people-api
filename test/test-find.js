/*
 * Original work (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland,
 * VPSI, 2017-2018.
 * Modified work (c) William Belle, 2018.
 * See the LICENSE file for more details.
 */

const should = require('chai').should();
const rewire = require('rewire');

const epflPeopleApi = require('../src/index.js');

describe('epfl-people-api find', () => {
  // Sadly...
  it('shouldn\'t find Taylor Swift', () => {
    return epflPeopleApi.find(
      'Taylor Swift',
      'en'
    ).then((res) => res.length.should.equal(0));
  });

  it('should find Lindo Duratti', () => {
    return epflPeopleApi.find(
      'Lindo Duratti',
      null
    ).then((res) => {
      res.length.should.equal(1);
      res[0].sciper.should.equal('128871');
    });
  });

  it('should fail with a wrong service url', (done) => {
    let epflPeopleApiMock = rewire('../src/index.js');
    epflPeopleApiMock.__set__('SEARCH_URL', 'foobar');
    let result = epflPeopleApiMock.find('Lindo', 'en');
    result.then((response) => {
      should.fail();
      done();
    }).catch((reason) => done());
  });
});
