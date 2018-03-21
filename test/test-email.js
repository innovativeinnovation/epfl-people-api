/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017-2018.
 * See the LICENSE file for more details.
 */

require('chai').should();

var epflPeopleApi = require('../src/index.js');

describe('epfl-people-api findByEmail', function () {
  it('should throw an exception with email xxx', function () {
    return epflPeopleApi.findByEmail('xxx', 'en').then(function () {
    }).catch(function (err) {
      err.message.should.equal('Expected an email');
    });
  });

  // Sadly...
  it('should throw an exception with email taylor.swift@epfl.ch', function () {
    return epflPeopleApi.findByEmail(
      'taylor.swift@epfl.ch',
      'en'
    ).then(function () {
    }).catch(function (err) {
      err.message.should.equal('Email does not exist');
    });
  });

  it('should find email lindo.duratti@epfl.ch', function () {
    return epflPeopleApi.findByEmail(
      'lindo.duratti@epfl.ch',
      'en'
    ).then(function (res) {
      res.name.should.equal('Duratti');
      res.firstname.should.equal('Lindo');
      res.office.should.equal('INN 015');
    });
  });

  it('should find email laurent.boatto@epfl.ch', function () {
    return epflPeopleApi.findByEmail(
      'laurent.boatto@epfl.ch',
      null
    ).then(function (res) {
      res.name.should.equal('Boatto');
      res.firstname.should.equal('Laurent');
      res.office.should.equal('MA B0 519');
    });
  });
});
