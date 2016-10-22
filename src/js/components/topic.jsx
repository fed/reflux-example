import React from 'react';
import Reflux from 'reflux';

import Actions from '../actions';
import ImageStore from '../stores/image-store';
import ImagePreview from './image-preview';

export default class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { images: [] };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    Actions.getImages(this.props.params.id);
  }

  // here the component doesn't get removed from the DOM
  // but instead gets a new set of properties
  componentWillReceiveProps(nextProps) {
    Actions.getImages(nextProps.params.id);
  }

  onChange(event, images) {
    this.setState({
      images: images
    });
  }

  renderImage(image) {
    return <ImagePreview key={image.id} {...image} />
  }

  render() {
    return <div className="gallery">
      {this.state.images.map(this.renderImage)}
    </div>
  }
}

Topic.mixins = [
  Reflux.listenTo(ImageStore, 'onChange')
];
