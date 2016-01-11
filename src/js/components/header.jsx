var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  render: function () {
    return <header>
      <div className="page-header">
        <h1>Imgur Browser <small>API docs <a href="https://api.imgur.com/" target="_blank">here</a></small></h1>
      </div>
      <ul className="nav nav-tabs">
        <li className="active"><Link to="/">Home</Link></li>
        <li><Link to="1">Profile</Link></li>
        <li><Link to="2">Messages</Link></li>
      </ul>
    </header>
  }
});
