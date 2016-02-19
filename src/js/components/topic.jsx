var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions');
var ImageStore = require('../stores/image-store');
var Image = require('./image');

module.exports = React.createClass({

  mixins: [
    Reflux.listenTo(ImageStore, 'onChange')
  ],

  getInitialState: function () {
    return {
      images: []
    };
  },

  componentWillMount: function () {
    Actions.getImages(this.props.params.id);
  },

  // here the component doesn't get removed from the DOM
  // but instead gets a new set of properties
  componentWillReceiveProps: function (nextProps) {
    Actions.getImages(nextProps.params.id);
  },

  onChange: function (event, images) {
    this.setState({
      images: images
    });
  },

  renderImage: function (image) {
    return <Image key={image.id} {...image} />
  },

  render: function () {
    return <div className="gallery">
      {this.state.images.map(this.renderImage)}
    </div>
  }
});
