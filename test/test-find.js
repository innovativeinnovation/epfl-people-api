/*
 * Original work (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland,
 * VPSI, 2017-2018.
 * Modified work (c) William Belle, 2018-2021.
 * See the LICENSE file for more details.
 */

const chai = require('chai');
const rewire = require('rewire');

const assert = chai.assert;
chai.use(require('chai-as-promised'));

const epflPeopleApi = require('../src/index.js');

describe('epfl-people-api find', function () {
  this.timeout(10000);

  it('shouldn\'t find Taylor Swift', async () => {
    const list = await epflPeopleApi.find('Taylor Swift', 'en');
    assert.equal(list.length, 0);
  });

  it('should find Lindo Duratti', async () => {
    const list = await epflPeopleApi.find('Lindo Duratti');
    assert.equal(list.length, 1);
    assert.equal(list[0].sciper, '128871');
  });

  it('should fail with a wrong service url', () => {
    const epflPeopleApiMock = rewire('../src/index.js');
    epflPeopleApiMock.__set__('SEARCH_URL', 'foobar');

    const getException = async () => {
      await epflPeopleApiMock.find('Lindo', 'en');
    };
    return assert.isRejected(getException(), TypeError).then((err) => {
      assert.equal(err.code, 'ERR_INVALID_URL');
      assert.include(err.message, 'Invalid URL');
    });
  });
});
