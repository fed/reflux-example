var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');
var TopicStore = require('../stores/topic-store');

module.exports = React.createClass({

  // whenever an event is trigger by the store,
  // we'll automatically run the onChange method
  mixins: [
    Reflux.listenTo(TopicStore, 'onChange')
  ],

  // topics list starts out with an empty array
  // we can still map an empty array on renderTopics()
  // if we didn't set this to [] we'd get an error
  getInitialState: function () {
    return {
      topics: []
    };
  },

  // call the getTopics action when the component is about to be rendered
  componentWillMount: function () {
    Actions.getTopics();
  },

  // we take the new list of topics as an argument and set it as our state.
  // setting the sate automatically triggers a re-render of our component
  onChange: function (event, topics) {
    this.setState({
      topics: topics
    });
  },

  renderTopics: function () {
    return this.state.topics.map(function (topic) {
      return <Link to={'topics/' + topic.id} key={topic.id} className="list-group-item">
        <h4>{topic.name}</h4>
        <p>{topic.description}</p>
      </Link>
    })
  },

  render: function () {
    return <div className="list-group">
      <ul>{this.renderTopics()}</ul>
    </div>
  }
});
