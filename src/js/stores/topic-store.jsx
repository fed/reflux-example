var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({

  // listen to all of our available actions:
  // for any action that gets trigger, this store
  // is gonna try to run a method with the exact same name
  listenables: [Actions],

  // fire off an ajax request (custom api module)
  getTopics: function () {
    return Api.get('topics/defaults').then(function (response) {
      this.topics = response.data;
      this.triggerChange();
    }.bind(this));
  },

  // trigger the change event and pass in our list of topics
  triggerChange: function () {
    this.trigger('change', this.topics);
  }
});
