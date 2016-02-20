var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');
var _ = require('lodash');

module.exports = Reflux.createStore({

  listenables: [Actions],

  getImageById: function (imageId) {
    Api.get('gallery/' + imageId + '/comments').then(function (response) {
      this.comments = response.data;
      this.triggerChange();
    }.bind(this));
  },

  triggerChange: function () {
    this.trigger('change', this.comments);
  }
});
