/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var got = require('got');

var SEARCH_URL = 'https://search.epfl.ch/json/ws_search.action';

var buildsearchUrl = function(q,locale) {
  var params = '?q=' + q + '&request_locle=' + locale;
  return SEARCH_URL + params;
};

exports.findBySciper = function(sciper, locale) {
  if (sciper !== parseInt(sciper, 10) || sciper < 100000 || sciper > 999999) {
    return Promise.reject(new TypeError('Expected a sciper'));
  }

  locale = locale || 'en';

  var url = buildsearchUrl(sciper, locale);

  return new Promise(function(resolve, reject) {
    got(url).then(function(response) {
      var data = JSON.parse(response.body);
      if (data.length === 0) {
        throw new TypeError('Sciper does not exist');
      }
      resolve(data[0]);
    }).catch(function(err) {
      reject(err);
    });
  });
};
