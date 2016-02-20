import Fetch from 'whatwg-fetch';
import {ROOT_URL, API_KEY} from './constants';

export default {
  get: (url) => {
    return fetch(ROOT_URL + url, {
      headers: {
        'Authorization': 'Client-ID ' + API_KEY
      }
    }).then(function (response) {
      return response.json();
    });
  }
};
