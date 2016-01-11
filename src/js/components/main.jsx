var React = require('react');
var Header = require('./header');

module.exports = React.createClass({
  render: function () {
    return <div>
      <Header />

      <section className="main-content">
        {this.props.children}
      </section>
    </div>
  }
});
