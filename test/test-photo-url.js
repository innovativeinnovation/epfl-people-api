/*
 * (c) William Belle, 2020-2021.
 * See the LICENSE file for more details.
 */

const should = require('chai').should();

const epflPeopleApi = require('../src/index.js');

describe('epfl-people-api getPhotoUrl', function () {
  this.timeout(10000);

  it('should throw an exception with sciper xxx', () => {
    return epflPeopleApi.getPhotoUrl('xxx').then(() => {
    }).catch((err) => err.message.should.equal('Expected a sciper'));
  });

  it('shouldn\'t get photo url of 128871', () => {
    return epflPeopleApi.getPhotoUrl(128871).then((photoUrl) => {
      should.not.exist(photoUrl);
    });
  });

  it('should get photo url of 278890', () => {
    return epflPeopleApi.getPhotoUrl(278890).then((photoUrl) => {
      photoUrl.should.equal(
        'https://people.epfl.ch/private/common/photos/links/278890.jpg'
      );
    });
  });
});
