/*
 * Original work (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland,
 * VPSI, 2017-2018.
 * Modified work (c) William Belle, 2018-2021.
 * See the LICENSE file for more details.
 */

const chai = require('chai');
const assert = chai.assert;
chai.use(require('chai-as-promised'));

const epflPeopleApi = require('../src/index.js');

describe('epfl-people-api findByEmail', function () {
  this.timeout(10000);

  it('should throw an exception with email xxx', () => {
    const getException = async () => {
      await epflPeopleApi.findByEmail('xxx', 'en');
    };
    return assert.isRejected(getException(), TypeError).then((err) => {
      assert.equal(err.message, 'Expected an email');
    });
  });

  it('should throw an exception with email taylor.swift@epfl.ch', () => {
    const getException = async () => {
      await epflPeopleApi.findByEmail('taylor.swift@epfl.ch', 'en');
    };
    return assert.isRejected(getException(), TypeError).then((err) => {
      assert.equal(err.message, 'Email does not exist');
    });
  });

  it('should find email lindo.duratti@epfl.ch', async () => {
    const person = await epflPeopleApi.findByEmail(
      'lindo.duratti@epfl.ch',
      'en'
    );
    assert.equal(person.name, 'Duratti');
    assert.equal(person.firstname, 'Lindo');
    assert.equal(person.accreds[0].officeList[0], 'MA A0 393');
  });

  it('should find email yves.junod@epfl.ch', async () => {
    const person = await epflPeopleApi.findByEmail('yves.junod@epfl.ch');
    assert.equal(person.name, 'Junod');
    assert.equal(person.firstname, 'Yves');
    assert.equal(person.accreds[0].officeList[0], 'MA B0 449');
  });
});
