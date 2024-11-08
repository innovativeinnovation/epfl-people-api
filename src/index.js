/*
 * Original work (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland,
 * VPSI, 2017-2018.
 * Modified work (c) William Belle, 2018-2024.
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

async function findBySciper (sciper, locale = 'en') {
  if (!isSciper(sciper)) {
    throw new TypeError('Expected a sciper');
  }

  const url = buildSearchUrl(sciper, locale);

  const [data] = await got(url).json();
  if (!data) {
    throw new TypeError('Sciper does not exist');
  }
  return data;
};

async function findByEmail (email, locale = 'en') {
  if (!validator.isEmail(email)) {
    throw new TypeError('Expected an email');
  }

  const url = buildSearchUrl(email, locale);

  const [data] = await got(url).json();
  if (!data) {
    throw new TypeError('Email does not exist');
  }
  return data;
};

async function find (string, locale = 'en') {
  const url = buildSearchUrl(string, locale);
  return await got(url).json();
};

async function hasPhoto (sciper) {
  if (!isSciper(sciper)) {
    throw new TypeError('Expected a sciper');
  }

  const url = buildPhotoUrl(sciper);

  try {
    await got(url);
    return true;
  } catch {
    return false;
  }
};

async function getPhotoUrl (sciper) {
  const photo = await hasPhoto(sciper);
  if (photo) {
    return buildPhotoUrl(sciper);
  }
  return null;
};

exports.find = find;
exports.findByEmail = findByEmail;
exports.findBySciper = findBySciper;

exports.hasPhoto = hasPhoto;
exports.getPhotoUrl = getPhotoUrl;
