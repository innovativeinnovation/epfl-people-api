/*
 * Original work (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland,
 * VPSI, 2017-2018.
 * Modified work (c) William Belle, 2018-2021.
 * See the LICENSE file for more details.
 */

const got = require('got');
const validator = require('validator');

const SEARCH_URL = 'https://search-api.epfl.ch/api/ldap';
const PHOTO_URL = 'https://people.epfl.ch/private/common/photos/links/';

const buildSearchUrl = (q, locale) => {
  const queryParameters = '?q=' + q + '&hl=' + locale;
  return SEARCH_URL + queryParameters;
};

const buildPhotoUrl = (sciper) => {
  return PHOTO_URL + sciper + '.jpg';
};

const isSciper = (sciper) => {
  if (sciper !== parseInt(sciper, 10) || sciper < 100000 || sciper > 999999) {
    return false;
  }
  return true;
};

const findBySciper = (sciper, locale = 'en') => {
  if (!isSciper(sciper)) {
    return Promise.reject(new TypeError('Expected a sciper'));
  }

  const url = buildSearchUrl(sciper, locale);

  return new Promise((resolve, reject) => {
    got(url).then((response) => {
      const data = JSON.parse(response.body);
      if (data.length === 0) {
        throw new TypeError('Sciper does not exist');
      }
      resolve(data[0]);
    }).catch((err) => reject(err));
  });
};

const findByEmail = (email, locale = 'en') => {
  if (!validator.isEmail(email)) {
    return Promise.reject(new TypeError('Expected an email'));
  }

  const url = buildSearchUrl(email, locale);

  return new Promise((resolve, reject) => {
    got(url).then((response) => {
      const data = JSON.parse(response.body);
      if (data.length === 0) {
        throw new TypeError('Email does not exist');
      }
      resolve(data[0]);
    }).catch((err) => reject(err));
  });
};

const find = (string, locale = 'en') => {
  const url = buildSearchUrl(string, locale);

  return new Promise((resolve, reject) => {
    got(url).then((response) => {
      const data = JSON.parse(response.body);
      resolve(data);
    }).catch((err) => reject(err));
  });
};

const hasPhoto = (sciper) => {
  if (!isSciper(sciper)) {
    return Promise.reject(new TypeError('Expected a sciper'));
  }

  const url = buildPhotoUrl(sciper);

  return new Promise((resolve, reject) => {
    got(url).then((response) => {
      resolve(true);
    }).catch(() => resolve(false));
  });
};

const getPhotoUrl = (sciper) => {
  return new Promise((resolve, reject) => {
    hasPhoto(sciper).then(function (photo) {
      if (photo) {
        resolve(buildPhotoUrl(sciper));
      }
      resolve(null);
    }).catch((err) => reject(err));
  });
};

exports.find = find;
exports.findByEmail = findByEmail;
exports.findBySciper = findBySciper;

exports.hasPhoto = hasPhoto;
exports.getPhotoUrl = getPhotoUrl;
