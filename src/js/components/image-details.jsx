var React = require('react');
var Reflux = require('reflux');
var ImageStore = require('../stores/image-store');
var CommentStore = require('../stores/comment-store');
var Actions = require('../actions');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ImageStore, 'onChange'),
    Reflux.listenTo(CommentStore, 'onChange')
  ],

  getInitialState: function () {
    return {
      image: {},
      comments: []
    };
  },

  componentWillMount: function () {
    Actions.getImageById(this.props.params.id);
  },

  renderImage: function () {
    if (this.state.image.animated) {
      return <video preload="auto" autoPlay loop webkit-playsinline>
        <source src={this.state.image.mp4} type="video/mp4"></source>
      </video>
    } else {
      return <div>
        <img src={this.state.image.link} alt={this.state.image.title} />
      </div>
    }
  },

  renderComments: function () {
    if (this.state.comments) {
      return this.state.comments.map(function (comment) {
        return <p key={comment.id}><strong>{comment.author}:</strong> {comment.comment}</p>
      });
    } else {
      return <p>There are no comments</p>
    }
  },

  render: function () {
    return <article className="gallery__details" key={this.state.image.id}>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>{this.state.image.title}</h4>
        </div>
        <div className="panel-body">
          {this.renderImage()}
        </div>
        <div className="panel-footer">
          {this.state.image.description}
        </div>
      </div>

      <div className="gallery__details__comments">
        <h3>Comments</h3>
        {this.renderComments()}
      </div>
    </article>
  },

  onChange: function () {
    this.setState({
      image: ImageStore.find(this.props.params.id),
      comments: CommentStore.comments
    });
  }
});
