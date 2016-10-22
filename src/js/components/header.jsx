import React from 'react';
import Reflux from 'reflux';
import {Link} from 'react-router';

import Actions from '../actions';
import TopicStore from '../stores/topic-store';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { topics: [] };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    Actions.getTopics();
  }

  onChange(event, topics) {
    this.setState({
      topics: topics
    });
  }

  renderTopic(topic) {
    return <li key={topic.id}>
      <Link to={'topics/' + topic.id} activeClassName="active">{topic.name}</Link>
    </li>
  }

  render() {
    return <header>
      <div className="page-header">
        <h1>Imgur Browser <small>API docs <a href="https://api.imgur.com/" target="_blank">here</a></small></h1>
      </div>

      <ul className="nav nav-tabs">
        {this.state.topics.map(this.renderTopic)}
      </ul>
    </header>
  }
}

Header.mixins = [
  Reflux.listenTo(TopicStore, 'onChange')
];
