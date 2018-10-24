/*
 * Original work (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland,
 * VPSI, 2017-2018.
 * Modified work (c) William Belle, 2018.
 * See the LICENSE file for more details.
 */

const should = require('chai').should();
const rewire = require('rewire');

const epflPeopleApi = require('../src/index.js');

describe('epfl-people-api findBySciper', () => {
  it('should throw an exception with sciper xxx', () => {
    return epflPeopleApi.findBySciper('xxx', 'en').then(() => {
    }).catch((err) => err.message.should.equal('Expected a sciper'));
  });

  it('should throw an exception with sciper 69', () => {
    return epflPeopleApi.findBySciper(69).then(() => {
    }).catch((err) => err.message.should.equal('Expected a sciper'));
  });

  it('should throw an exception with sciper 1000051', () => {
    return epflPeopleApi.findBySciper(1000051, 'en').then(() => {
    }).catch((err) => err.message.should.equal('Expected a sciper'));
  });

  it('should throw an exception with sciper 100000', () => {
    return epflPeopleApi.findBySciper(100000, 'en').then(() => {
    }).catch((err) => err.message.should.equal('Sciper does not exist'));
  });

  it('should fail with a wrong service url', (done) => {
    let epflPeopleApiMock = rewire('../src/index.js');
    epflPeopleApiMock.__set__('SEARCH_URL', 'foobar');
    let result = epflPeopleApiMock.findBySciper(280556, 'en');
    result.then((response) => {
      should.fail();
      done();
    }).catch((reason) => done());
  });

  it('should find sciper 128871 in en', () => {
    return epflPeopleApi.findBySciper(128871, 'en').then((res) => {
      res.name.should.equal('Duratti');
      res.firstname.should.equal('Lindo');
      res.office.should.equal('INN 015');
      res.position.should.equal('Computer Scientist');
    });
  });

  it('should find sciper 128871 in fr', () => {
    return epflPeopleApi.findBySciper(128871, 'fr').then((res) => {
      res.position.should.equal('Informaticien');
    });
  });

  it('should find sciper 188475', function () {
    return epflPeopleApi.findBySciper(188475, undefined).then((res) => {
      res.name.should.equal('Charmier');
      res.firstname.should.equal('Grégory');
      res.office.should.equal('MA B0 519');
    });
  });
});
