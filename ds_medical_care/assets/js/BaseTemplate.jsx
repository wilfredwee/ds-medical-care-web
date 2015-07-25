var React = require('react');
var $ = require('jquery');
var Cookies = require('js-cookie');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var ReactiveStore = require("./ReactiveStore");
var AjaxHelpers = require("./AjaxHelpers");

var LoginComponent = require('./LoginComponent');

var BaseTemplate = React.createClass({
   render: function() {
       return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">DS Medical Care</Link>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <LoginLogoutComponent parent={this.props.parent} />
            </ul>
          </div>
        </nav>
      );
   }
});

var LoginLogoutComponent = React.createClass({
  mixins: [ReactRouter.Navigation],

  handleLogout: function(e) {
    var self = this;
    e.preventDefault();

    AjaxHelpers.logout().done(function() {
      self.transitionTo("/");
    });
  },

  render: function() {
    if(this.props.parent) {
      return <li><a href="#" onClick={this.handleLogout}>Logout</a></li>;
    }
    return <li><Link to="login">Login</Link></li>;
  }
});

module.exports = BaseTemplate;

