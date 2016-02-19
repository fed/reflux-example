var React = require('react');

module.exports = React.createClass({
  render: function () {
    return <div key={this.props.id} className="gallery__image">
      <img src={this.imagePreviewUrl(this.props.id)} alt={this.props.title} />
    </div>
  },

  imagePreviewUrl: function (imageId) {
    return 'http://i.imgur.com/' + imageId + 'h.jpg';
  }
});
