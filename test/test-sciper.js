/*
 * Original work (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland,
 * VPSI, 2017-2018.
 * Modified work (c) William Belle, 2018-2021.
 * See the LICENSE file for more details.
 */

const should = require('chai').should();
const rewire = require('rewire');

const epflPeopleApi = require('../src/index.js');

describe('epfl-people-api findBySciper', function () {
  this.timeout(10000);

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
    const epflPeopleApiMock = rewire('../src/index.js');
    epflPeopleApiMock.__set__('SEARCH_URL', 'foobar');
    const result = epflPeopleApiMock.findBySciper(280556, 'en');
    result.then((response) => {
      should.fail();
      done();
    }).catch((reason) => done());
  });

  it('should find sciper 128871 in en', () => {
    return epflPeopleApi.findBySciper(128871, 'en').then((res) => {
      res.name.should.equal('Duratti');
      res.firstname.should.equal('Lindo');
      res.accreds[0].officeList[0].should.equal('INN 018');
      res.accreds[0].position.should.equal('Computer Scientist');
    });
  });

  it('should find sciper 128871 in fr', () => {
    return epflPeopleApi.findBySciper(128871, 'fr').then((res) => {
      res.accreds[0].position.should.equal('Informaticien');
    });
  });

  it('should find sciper 160781', function () {
    return epflPeopleApi.findBySciper(160781, undefined).then((res) => {
      res.name.should.equal('Junod');
      res.firstname.should.equal('Yves');
      res.accreds[0].officeList[0].should.equal('MA B0 449');
    });
  });
});
