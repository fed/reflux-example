import React from 'react';
import Reflux from 'reflux';
import {Link} from 'react-router';

import Api from '../utils/api';
import Actions from '../actions';
import TopicStore from '../stores/topic-store';

export default class TopicList extends React.Component {

  // topics list starts out with an empty array
  // we can still map an empty array on renderTopics()
  // if we didn't set this to [] we'd get an error
  constructor(props) {
    super(props);
    this.state = { topics: [] };
    this.onChange = this.onChange.bind(this);
  }

  // call the getTopics action when the component is about to be rendered
  componentWillMount() {
    Actions.getTopics();
  }

  // we take the new list of topics as an argument and set it as our state.
  // setting the sate automatically triggers a re-render of our component
  onChange(event, topics) {
    this.setState({
      topics: topics
    });
  }

  renderTopics() {
    return this.state.topics.map(function (topic) {
      return <Link to={'topics/' + topic.id} key={topic.id} className="list-group-item">
        <h4>{topic.name}</h4>
        <p>{topic.description}</p>
      </Link>
    });
  }

  render() {
    return <div className="list-group">
      <ul>{this.renderTopics()}</ul>
    </div>
  }
}

// whenever an event is trigger by the store,
// we'll automatically run the onChange method
TopicList.mixins = [
  Reflux.listenTo(TopicStore, 'onChange')
];
