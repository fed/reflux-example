var React = require('react');

module.exports = React.createClass({
  render: function () {
    return <div>
      <img src={this.props.link} alt={this.props.title} />
    </div>
  }
});
