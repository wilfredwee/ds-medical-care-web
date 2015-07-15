var React = require('react');
var $ = require('jquery');
var LoginComponent = require('./LoginComponent');

var App = React.createClass({
   render: function() {
       return (
        <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">DS Medical Care</a>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <LoginComponent />
          </div>
        </div>
        </div>
      );
   }
});

module.exports = App;

