import React from 'react';
import {Link} from 'react-router';

export default class ImagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  render() {
    return <Link to={'images/' + this.props.id}
                key={this.props.id}
                className="gallery__image"
                onMouseEnter={this.handleOnMouseEnter}
                onMouseLeave={this.handleOnMouseLeave}>
      {this.state.hover && this.props.animated ? this.renderVideo() : this.renderImage()}
      {!this.state.hover && this.props.animated ? this.renderPlayButton() : null}
      {this.state.hover ? this.renderDetails() : null}
    </Link>
  }

  handleOnMouseEnter() {
    this.setState({ hover: true });
  }

  handleOnMouseLeave() {
    this.setState({ hover: false });
  }

  renderPlayButton() {
    return <span className="gallery__image__icon-play">
      <img src="assets/play.svg" />
    </span>
  }

  renderDetails() {
    return <span className="gallery__image__details">
      Views: {this.props.views}<br />
      Upvotes: {this.props.ups}
    </span>
  }

  renderVideo() {
    return <video preload="auto" autoPlay loop>
      <source src={this.props.mp4} type="video/mp4"></source>
    </video>
  }

  renderImage() {
    return <img src={this.imagePreviewUrl(this.props.id)} alt={this.props.title} />
  }

  imagePreviewUrl(imageId) {
    return 'http://i.imgur.com/' + imageId + 'h.jpg';
  }
}
