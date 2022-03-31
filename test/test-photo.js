/*
 * Original work (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland,
 * VPSI, 2017-2018.
 * Modified work (c) William Belle, 2018-2022.
 * See the LICENSE file for more details.
 */

const chai = require('chai');
const rewire = require('rewire');

const assert = chai.assert;
chai.use(require('chai-as-promised'));

const epflPeopleApi = require('../src/index.js');

describe('epfl-people-api hasPhoto', function () {
  this.timeout(10000);

  it('should throw an exception with sciper xxx', () => {
    const getException = async () => {
      await epflPeopleApi.hasPhoto('xxx', 'en');
    };
    return assert.isRejected(getException(), TypeError).then((err) => {
      assert.equal(err.message, 'Expected a sciper');
    });
  });

  it('should throw an exception with sciper 69', () => {
    const getException = async () => {
      await epflPeopleApi.hasPhoto(69);
    };
    return assert.isRejected(getException(), TypeError).then((err) => {
      assert.equal(err.message, 'Expected a sciper');
    });
  });

  it('should throw an exception with sciper 1000051', () => {
    const getException = async () => {
      await epflPeopleApi.hasPhoto(1000051);
    };
    return assert.isRejected(getException(), TypeError).then((err) => {
      assert.equal(err.message, 'Expected a sciper');
    });
  });

  it('should fail with a wrong service url', async () => {
    const epflPeopleApiMock = rewire('../src/index.js');
    epflPeopleApiMock.__set__('PHOTO_URL', 'foobar');

    const photo = await epflPeopleApiMock.hasPhoto(280556, 'en');
    assert.equal(photo, false);
  });

  it('shouldn\'t find photo of Lindo Duratti', async () => {
    const photo = await epflPeopleApi.hasPhoto(128871);
    assert.equal(photo, false);
  });

  it('should find photo of Anastasiia Oryshchuk', async () => {
    const photo = await epflPeopleApi.hasPhoto(278890);
    assert.equal(photo, true);
  });
});
