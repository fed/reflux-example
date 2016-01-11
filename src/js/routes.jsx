var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;

var Main = require('./components/main');
var Child1 = require('./components/child1');
var Child2 = require('./components/child2');

module.exports = (
  <Router>
    <Route path="/" component={Main}>
      <Route path="1" component={Child1} />
      <Route path="2" component={Child2} />
    </Route>
  </Router>
);
