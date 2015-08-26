var React = require('react');

var LoginComponent = require('../LoginComponent');

var LoginPage = React.createClass({
  render: function() {
    return (
      <div style={{maxWidth: 450}} className="container center-block">
        <div className="row">
          <LoginComponent />
        </div>
      </div>
    );
  }
});

module.exports = LoginPage;
