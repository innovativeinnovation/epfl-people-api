/*
 * Original work (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland,
 * VPSI, 2017-2018.
 * Modified work (c) William Belle, 2018-2021.
 * See the LICENSE file for more details.
 */

require('chai').should();

const epflPeopleApi = require('../src/index.js');

describe('epfl-people-api findByEmail', function () {
  this.timeout(10000);

  it('should throw an exception with email xxx', () => {
    return epflPeopleApi.findByEmail('xxx', 'en').then(() => {
    }).catch((err) => err.message.should.equal('Expected an email'));
  });

  // Sadly...
  it('should throw an exception with email taylor.swift@epfl.ch', () => {
    return epflPeopleApi.findByEmail(
      'taylor.swift@epfl.ch',
      'en'
    ).then(() => {
    }).catch((err) => err.message.should.equal('Email does not exist'));
  });

  it('should find email lindo.duratti@epfl.ch', () => {
    return epflPeopleApi.findByEmail(
      'lindo.duratti@epfl.ch',
      'en'
    ).then((res) => {
      res.name.should.equal('Duratti');
      res.firstname.should.equal('Lindo');
      res.office.should.equal('INN 018');
    });
  });

  it('should find email yves.junod@epfl.ch', () => {
    return epflPeopleApi.findByEmail(
      'yves.junod@epfl.ch'
    ).then((res) => {
      res.name.should.equal('Junod');
      res.firstname.should.equal('Yves');
      res.office.should.equal('MA B0 449');
    });
  });
});
