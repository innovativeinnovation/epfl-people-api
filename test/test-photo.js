/*
 * Original work (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland,
 * VPSI, 2017-2018.
 * Modified work (c) William Belle, 2018-2021.
 * See the LICENSE file for more details.
 */

const should = require('chai').should();
const rewire = require('rewire');

const epflPeopleApi = require('../src/index.js');

describe('epfl-people-api hasPhoto', function () {
  this.timeout(10000);

  it('should throw an exception with sciper xxx', () => {
    return epflPeopleApi.hasPhoto('xxx').then(() => {
    }).catch((err) => err.message.should.equal('Expected a sciper'));
  });

  it('should throw an exception with sciper 69', () => {
    return epflPeopleApi.hasPhoto(69).then(() => {
    }).catch((err) => err.message.should.equal('Expected a sciper'));
  });

  it('should throw an exception with sciper 1000051', () => {
    return epflPeopleApi.hasPhoto(1000051).then(() => {
    }).catch((err) => err.message.should.equal('Expected a sciper'));
  });

  it('should fail with a wrong service url', (done) => {
    const epflPeopleApiMock = rewire('../src/index.js');
    epflPeopleApiMock.__set__('PHOTO_URL', 'foobar');
    const result = epflPeopleApiMock.hasPhoto(280556, 'en');
    result.then((response) => {
      should.fail();
      done();
    }).catch((reason) => done());
  });

  it('shouldn\'t find photo of Lindo Duratti', () => {
    return epflPeopleApi.hasPhoto(128871).then((hasPhoto) => {
      hasPhoto.should.equal(false);
    });
  });

  it('should find photo of Anastasiia Oryshchuk', () => {
    return epflPeopleApi.hasPhoto(278890).then((hasPhoto) => {
      hasPhoto.should.equal(true);
    });
  });
});
