var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;

var Main = require('./components/main');
var Topic = require('./components/topic');
var ImageDetails = require('./components/image-details');

module.exports = (
  <Router>
    <Route path="/" component={Main}>
      <Route path="topics/:id" component={Topic} />
      <Route path="images/:id" component={ImageDetails} />
    </Route>
  </Router>
);
