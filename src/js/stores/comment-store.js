import Reflux from 'reflux';

import Api from '../utils/api';
import Actions from '../actions';

export default Reflux.createStore({
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
