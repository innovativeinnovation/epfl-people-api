/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017-2018.
 * See the LICENSE file for more details.
 */

var got = require('got');
var validator = require('validator');

var SEARCH_URL = 'https://search.epfl.ch/json/ws_search.action';
var PHOTO_URL = 'https://people.epfl.ch/cgi-bin/people/getPhoto?id=';

var buildsearchUrl = function (q, locale) {
  var params = '?q=' + q + '&request_locale=' + locale;
  return SEARCH_URL + params;
};

var isSciper = function (sciper) {
  if (sciper !== parseInt(sciper, 10) || sciper < 100000 || sciper > 999999) {
    return false;
  }
  return true;
};

exports.findBySciper = function (sciper, locale) {
  if (!isSciper(sciper)) {
    return Promise.reject(new TypeError('Expected a sciper'));
  }

  locale = locale || 'en';

  var url = buildsearchUrl(sciper, locale);

  return new Promise(function (resolve, reject) {
    got(url).then(function (response) {
      var data = JSON.parse(response.body);
      if (data.length === 0) {
        throw new TypeError('Sciper does not exist');
      }
      resolve(data[0]);
    }).catch(function (err) {
      reject(err);
    });
  });
};

exports.findByEmail = function (email, locale) {
  if (!validator.isEmail(email)) {
    return Promise.reject(new TypeError('Expected an email'));
  }

  locale = locale || 'en';

  var url = buildsearchUrl(email, locale);

  return new Promise(function (resolve, reject) {
    got(url).then(function (response) {
      var data = JSON.parse(response.body);
      if (data.length === 0) {
        throw new TypeError('Email does not exist');
      }
      resolve(data[0]);
    }).catch(function (err) {
      reject(err);
    });
  });
};

exports.find = function (string, locale) {
  locale = locale || 'en';

  var url = buildsearchUrl(string, locale);

  return new Promise(function (resolve, reject) {
    got(url).then(function (response) {
      var data = JSON.parse(response.body);
      resolve(data);
    }).catch(function (err) {
      reject(err);
    });
  });
};

exports.hasPhoto = function (sciper) {
  if (!isSciper(sciper)) {
    return Promise.reject(new TypeError('Expected a sciper'));
  }

  var url = PHOTO_URL + sciper;

  return new Promise(function (resolve, reject) {
    got(url).then(function (response) {
      if (response.headers['content-type'].match(/image/)) {
        resolve(true);
      }
      resolve(false);
    }).catch(function (err) {
      reject(err);
    });
  });
};
