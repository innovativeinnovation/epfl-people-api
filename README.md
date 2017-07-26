<p align="center">
  <img alt="EPFL People API" src="https://raw.githubusercontent.com/epfl-devrun/epfl-people-api/master/docs/readme/readme-logo.png">
</p>

<p align="center">
  EPFL people directory API.
</p>

<p align="center">
  <a href="https://travis-ci.org/epfl-devrun/epfl-people-api">
    <img alt="Travis Status" src="https://travis-ci.org/epfl-devrun/epfl-people-api.svg?branch=master">
  </a>
  <a href="https://coveralls.io/github/epfl-devrun/epfl-people-api?branch=master">
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/epfl-devrun/epfl-people-api/badge.svg?branch=master"/>
  </a>
  <a href='https://gemnasium.com/github.com/epfl-devrun/epfl-people-api'>
    <img alt="Dependency Status" src="https://gemnasium.com/badges/github.com/epfl-devrun/epfl-people-api.svg" />
  </a>
  <a href="https://raw.githubusercontent.com/epfl-devrun/epfl-people-api/master/LICENSE">
    <img alt="MIT License" src="https://img.shields.io/badge/license-Apache%202.0-blue.svg">
  </a>
  <a href='https://www.npmjs.com/package/epfl-people-api'>
    <img alt="NPM Version" src="https://img.shields.io/npm/v/epfl-people-api.svg" />
  </a>
</p>

---

Install
-------

```bash
$ npm install --save epfl-people-api
```

Usage
-----

```javascript
var epflPeopleApi = require('epfl-people-api');

epflPeopleApi.findBySciper(128871, 'en').then(function(person) {
  console.log(person.name);      //=> 'Duratti'
  console.log(person.firstname); //=> 'Lindo'
  console.log(person.office);    //=> 'INN 015'
}).catch(function(err) {
  console.log(err);
});

epflPeopleApi.findByEmail('lindo.duratti@epfl.ch', 'en').then(function(person) {
  console.log(person.name);      //=> 'Duratti'
  console.log(person.firstname); //=> 'Lindo'
  console.log(person.office);    //=> 'INN 015'
}).catch(function(err) {
  console.log(err);
});
```

API
---

### .findBySciper(sciper, locale)

Type: `function`

Returns a Promise with a person as parameter.

##### sciper

Type: `number`

6-digit unique EPFL identification number.

##### locale

Type: `string`<br>
Default: `en`

Returns informations in `en` or `fr`.

### .findByEmail(email, locale)

Type: `function`

Returns a Promise with a person as parameter.

##### email

Type: `string`

A valid email address.

##### locale

Type: `string`<br>
Default: `en`

Returns informations in `en` or `fr`.


Contributing
------------

Contributions are always welcome.

See [Contributing](CONTRIBUTING.md).

Developer
---------

  * [William Belle](https://github.com/williambelle)

License
-------

Apache License 2.0

(c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.

See the [LICENSE](LICENSE) file for more details.
