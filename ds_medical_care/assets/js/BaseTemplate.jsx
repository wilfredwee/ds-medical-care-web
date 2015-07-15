var React = require('react');
var $ = require('jquery');
var LoginComponent = require('./LoginComponent');
var ReactRouter = require('react-router');

var Link = ReactRouter.Link;

var BaseTemplate = React.createClass({
   render: function() {
       return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">DS Medical Care</Link>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="login">Login</Link></li>
            </ul>
          </div>
        </nav>
      );
   }
});

module.exports = BaseTemplate;

