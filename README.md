<p align="center">
  <img alt="EPFL People API Client" src="https://raw.githubusercontent.com/innovativeinnovation/epfl-people-api/master/docs/readme/readme-logo.png">
</p>

<p align="center">
  EPFL People API Client.
</p>

<p align="center">
  <a href="https://github.com/innovativeinnovation/epfl-people-api/actions">
    <img alt="Build Status" src="https://github.com/innovativeinnovation/epfl-people-api/workflows/Build/badge.svg?branch=master">
  </a>
  <a href="https://coveralls.io/github/innovativeinnovation/epfl-people-api?branch=master">
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/innovativeinnovation/epfl-people-api/badge.svg?branch=master"/>
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
const epflPeopleApi = require('epfl-people-api');

const person = await epflPeopleApi.findBySciper(128871, 'en');
console.log(person.firstname);                  // => 'Lindo'
console.log(person.name);                       // => 'Duratti'
console.log(person.accreds[0].officeList[0]);   // => 'MA A0 393'
console.log(person.accreds[0].position);        // => 'Computer Scientist'


const user = await epflPeopleApi.findByEmail('lindo.duratti@epfl.ch', 'en');
console.log(user.firstname);                 //=> 'Lindo'
console.log(user.sciper);                    //=> '128871'
console.log(user.accreds[0].phoneList[0]);   //=> '+41216934553'
console.log(user.accreds[0].acronym);        //=> 'ISAS-FSD'


const list = await epflPeopleApi.find('Oryshchuk', 'en');
console.log(list[0].firstname);   //=> 'Anastasiia'


const photo = await epflPeopleApi.hasPhoto(128871);
console.log(photo);   //=> false


const url = await epflPeopleApi.getPhotoUrl(278890);
console.log(url);   //=> https://people.epfl.ch/private/common/photos/links/278890.jpg
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

Supported locales are English (`en`) and French (`fr`).

### .findByEmail(email, locale)

Type: `function`

Returns a Promise with a person as parameter.

##### email

Type: `string`

A valid email address.

##### locale

Type: `string`<br>
Default: `en`

Supported locales are English (`en`) and French (`fr`).

### .find(q, locale)

Type: `function`

Returns a Promise with a list of person as parameter.

##### q

Type: `string`

The term to look for.

##### locale

Type: `string`<br>
Default: `en`

Supported locales are English (`en`) and French (`fr`).

### .hasPhoto(sciper)

Type: `function`

Returns a Promise with a boolean as parameter.

##### sciper

Type: `number`

6-digit unique EPFL identification number.

### .getPhotoUrl(sciper)

Type: `function`

Returns a Promise with a string as parameter.

##### sciper

Type: `number`

6-digit unique EPFL identification number.

See also
--------

* [who-is-sciper](https://github.com/innovativeinnovation/who-is-sciper)

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
Modified work (c) William Belle, 2018-2022.

See the [LICENSE](LICENSE) file for more details.
