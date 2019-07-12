/*
 * Original work (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland,
 * VPSI, 2017-2018.
 * Modified work (c) William Belle, 2018-2019.
 * See the LICENSE file for more details.
 */

const got = require('got');
const validator = require('validator');

const SEARCH_URL = 'https://search.epfl.ch/json/ws_search.action';
const PHOTO_URL = 'https://people.epfl.ch/private/common/photos/links/';

const buildSearchUrl = (q, locale) => {
  const queryParameters = '?q=' + q + '&request_locale=' + locale;
  return SEARCH_URL + queryParameters;
};

const isSciper = (sciper) => {
  if (sciper !== parseInt(sciper, 10) || sciper < 100000 || sciper > 999999) {
    return false;
  }
  return true;
};

exports.findBySciper = (sciper, locale = 'en') => {
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

exports.findByEmail = (email, locale = 'en') => {
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

exports.find = (string, locale = 'en') => {
  const url = buildSearchUrl(string, locale);

  return new Promise((resolve, reject) => {
    got(url).then((response) => {
      const data = JSON.parse(response.body);
      resolve(data);
    }).catch((err) => reject(err));
  });
};

exports.hasPhoto = (sciper) => {
  if (!isSciper(sciper)) {
    return Promise.reject(new TypeError('Expected a sciper'));
  }

  const url = PHOTO_URL + sciper + '.jpg';

  return new Promise((resolve, reject) => {
    got(url).then((response) => {
      resolve(true);
    }).catch(() => resolve(false));
  });
};
