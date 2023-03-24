/*
 * Original work (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland,
 * VPSI, 2017-2018.
 * Modified work (c) William Belle, 2018-2023.
 * See the LICENSE file for more details.
 */

const chai = require('chai');
const rewire = require('rewire');

const assert = chai.assert;
chai.use(require('chai-as-promised'));

const epflPeopleApi = require('../src/index.js');

describe('epfl-people-api findBySciper', function () {
  this.timeout(10000);

  it('should throw an exception with sciper xxx', () => {
    const getException = async () => {
      await epflPeopleApi.findBySciper('xxx', 'en');
    };
    return assert.isRejected(getException(), TypeError).then((err) => {
      assert.equal(err.message, 'Expected a sciper');
    });
  });

  it('should throw an exception with sciper 69', () => {
    const getException = async () => {
      await epflPeopleApi.findBySciper(69);
    };
    return assert.isRejected(getException(), TypeError).then((err) => {
      assert.equal(err.message, 'Expected a sciper');
    });
  });

  it('should throw an exception with sciper 1000051', () => {
    const getException = async () => {
      await epflPeopleApi.findBySciper(1000051, 'en');
    };
    return assert.isRejected(getException(), TypeError).then((err) => {
      assert.equal(err.message, 'Expected a sciper');
    });
  });

  it('should throw an exception with sciper 100000', () => {
    const getException = async () => {
      await epflPeopleApi.findBySciper(100000, 'en');
    };
    return assert.isRejected(getException(), TypeError).then((err) => {
      assert.equal(err.message, 'Sciper does not exist');
    });
  });

  it('should fail with a wrong service url', () => {
    const epflPeopleApiMock = rewire('../src/index.js');
    epflPeopleApiMock.__set__('SEARCH_URL', 'foobar');

    const getException = async () => {
      await epflPeopleApiMock.findBySciper(280556, 'en');
    };
    return assert.isRejected(getException(), TypeError).then((err) => {
      assert.equal(err.code, 'ERR_INVALID_URL');
      assert.include(err.message, 'Invalid URL');
    });
  });

  it('should find sciper 128871 in en', async () => {
    const person = await epflPeopleApi.findBySciper(128871, 'en');
    assert.equal(person.name, 'Duratti');
    assert.equal(person.firstname, 'Lindo');
    assert.equal(person.accreds[0].officeList[0], 'INN 016');
    assert.equal(person.accreds[0].position, 'Computer Scientist');
  });

  it('should find sciper 128871 in fr', async () => {
    const person = await epflPeopleApi.findBySciper(128871, 'fr');
    assert.equal(person.accreds[0].position, 'Informaticien');
  });

  it('should find sciper 160781', async () => {
    const person = await epflPeopleApi.findBySciper(160781, undefined);
    assert.equal(person.name, 'Junod');
    assert.equal(person.firstname, 'Yves');
    assert.equal(person.accreds[0].officeList[0], 'MA B0 449');
  });
});
