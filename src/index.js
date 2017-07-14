/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var got = require('got');

var SEARCH_URL = 'https://search.epfl.ch/json/ws_search.action';

var search = function(q,locale) {
  var params = '?q=' + q + '&request_locle=' + locale;
  return got(SEARCH_URL + params);
};

exports.findBySciper = function(sciper, locale) {
  if (sciper < 100000 || sciper > 999999) {
    return Promise.reject(new TypeError('Expected a sciper'));
  }

  locale = locale || 'en';

  return search(sciper, locale).then(function(response) {
    var data = JSON.parse(response.body);
    return data[0];
  }).catch(function(error) {
    return error;
  });
};
