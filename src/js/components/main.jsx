import React from 'react';

import Header from './header';
import TopicList from './topic-list';

export default class Main extends React.Component {
  render() {
    return <div>
      <Header />

      <section className="main-content">
        {this.content()}
      </section>
    </div>
  }

  content() {
    if (this.props.children) {
      return this.props.children;
    } else {
      return <TopicList />
    }
  }
}
