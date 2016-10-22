import React from 'react';
import {Router, Route} from 'react-router';

import Main from './components/main';
import Topic from './components/topic';
import ImageDetails from './components/image-details';

export default (
  <Router>
    <Route path="/" component={Main}>
      <Route path="topics/:id" component={Topic} />
      <Route path="images/:id" component={ImageDetails} />
    </Route>
  </Router>
);
