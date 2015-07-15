var React = require('react');

var LoginComponent = require('../LoginComponent');

var LoginPage = React.createClass({
  render: function() {
    return (
      <div className="container center-block">
        <div className="row">
          <LoginComponent />
        </div>
      </div>
    );
  }
});

module.exports = LoginPage;
