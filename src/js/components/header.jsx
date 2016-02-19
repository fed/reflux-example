var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;
var Actions = require('../actions');
var TopicStore = require('../stores/topic-store');

module.exports = React.createClass({

  mixins: [
    Reflux.listenTo(TopicStore, 'onChange')
  ],

  getInitialState: function () {
    return {
      topics: []
    }
  },

  componentWillMount: function () {
    Actions.getTopics();
  },

  onChange: function (event, topics) {
    this.setState({
      topics: topics
    });
  },

  renderTopic: function (topic) {
    return <li key={topic.id}>
      <Link to={'topics/' + topic.id} activeClassName="active">{topic.name}</Link>
    </li>
  },

  render: function () {
    return <header>
      <div className="page-header">
        <h1>Imgur Browser <small>API docs <a href="https://api.imgur.com/" target="_blank">here</a></small></h1>
      </div>

      <ul className="nav nav-tabs">
        {this.state.topics.map(this.renderTopic)}
      </ul>
    </header>
  }
});
