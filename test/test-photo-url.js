/*
 * (c) William Belle, 2020-2021.
 * See the LICENSE file for more details.
 */

const chai = require('chai');
const assert = chai.assert;
chai.use(require('chai-as-promised'));

const epflPeopleApi = require('../src/index.js');

describe('epfl-people-api getPhotoUrl', function () {
  this.timeout(10000);

  it('should throw an exception with sciper xxx', () => {
    const getException = async () => {
      await epflPeopleApi.getPhotoUrl('xxx');
    };
    return assert.isRejected(getException(), TypeError).then((err) => {
      assert.equal(err.message, 'Expected a sciper');
    });
  });

  it('shouldn\'t get photo url of 128871', async () => {
    const url = await epflPeopleApi.getPhotoUrl(128871);
    assert.notExists(url);
  });

  it('should get photo url of 278890', async () => {
    const url = await epflPeopleApi.getPhotoUrl(278890);
    assert.equal(
      url,
      'https://people.epfl.ch/private/common/photos/links/278890.jpg'
    );
  });
});
