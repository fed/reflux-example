var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;

var Main = require('./components/main');
var Topic = require('./components/topic');

module.exports = (
  <Router>
    <Route path="/" component={Main}>
      <Route path="topics/:id" component={Topic} />
    </Route>
  </Router>
);
