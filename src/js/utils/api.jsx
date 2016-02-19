var Fetch = require('whatwg-fetch');
var ROOT_URL = require('./constants').ROOT_URL;
var API_KEY = require('./constants').API_KEY;

module.exports = {
  get: function (url) {
    return fetch(ROOT_URL + url, {
      headers: {
        'Authorization': 'Client-ID ' + API_KEY
      }
    }).then(function (response) {
      return response.json();
    });
  }
};
