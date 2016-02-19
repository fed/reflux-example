var React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      hover: false
    };
  },

  render: function () {
    return <div key={this.props.id}
                className="gallery__image"
                onMouseEnter={this.handleOnMouseEnter}
                onMouseLeave={this.handleOnMouseLeave}>
      {this.state.hover && this.props.animated ? this.renderVideo() : this.renderImage()}
      {!this.state.hover && this.props.animated ? this.renderPlayButton() : null}
    </div>
  },

  handleOnMouseEnter: function () {
    this.setState({ hover: true });
  },

  handleOnMouseLeave: function () {
    this.setState({ hover: false });
  },

  renderPlayButton: function () {
    return <span className="gallery__image__icon-play">
      <img src="assets/play.svg" />
    </span>
  },

  renderVideo: function () {
    return <video preload="auto" autoPlay loop>
      <source src={this.props.mp4} type="video/mp4"></source>
    </video>
  },

  renderImage: function () {
    return <img src={this.imagePreviewUrl(this.props.id)} alt={this.props.title} />
  },

  imagePreviewUrl: function (imageId) {
    return 'http://i.imgur.com/' + imageId + 'h.jpg';
  }
});
