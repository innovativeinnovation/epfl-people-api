<p align="center">
  <img alt="EPFL People API" src="https://raw.githubusercontent.com/innovativeinnovation/epfl-people-api/master/docs/readme/readme-logo.png">
</p>

<p align="center">
  EPFL people directory API.
</p>

<p align="center">
  <a href="https://travis-ci.org/innovativeinnovation/epfl-people-api">
    <img alt="Travis Status" src="https://travis-ci.org/innovativeinnovation/epfl-people-api.svg?branch=master">
  </a>
  <a href="https://coveralls.io/github/innovativeinnovation/epfl-people-api?branch=master">
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/innovativeinnovation/epfl-people-api/badge.svg?branch=master"/>
  </a>
  <a href="https://david-dm.org/innovativeinnovation/epfl-people-api">
    <img alt="Dependency Status" src="https://david-dm.org/innovativeinnovation/epfl-people-api/status.svg"/>
  </a>
  <a href="https://raw.githubusercontent.com/innovativeinnovation/epfl-people-api/master/LICENSE">
    <img alt="Apache License 2.0" src="https://img.shields.io/badge/license-Apache%202.0-blue.svg">
  </a>
  <a href='https://www.npmjs.com/package/epfl-people-api'>
    <img alt="NPM Version" src="https://img.shields.io/npm/v/epfl-people-api.svg" />
  </a>
</p>

---

Install
-------

```bash
npm i epfl-people-api --save
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
  console.log(person.firstname); //=> 'Lindo'
}).catch(function(err) {
  console.log(err);
});

epflPeopleApi.find('Lindo', 'en').then(function(list) {
  console.log(list[0].firstname); //=> 'Lindo'
}).catch(function(err) {
  console.log(err);
});

epflPeopleApi.hasPhoto(128871).then(function(hasPhoto) {
  console.log(hasPhoto); //=> False
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

### .find(q, locale)

Type: `function`

Returns a Promise with a list of person as parameter.

##### q

Type: `string`

The term to look for.

##### locale

Type: `string`<br>
Default: `en`

Returns informations in `en` or `fr`.

### .hasPhoto(sciper)

Type: `function`

Returns a Promise with a boolean as parameter.

##### sciper

Type: `number`

6-digit unique EPFL identification number.


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

Original work (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017-2018.  
Modified work (c) William Belle, 2018.

See the [LICENSE](LICENSE) file for more details.
