var React = require('react');
var $ = require('jquery');
var _ = require('lodash');
var Cookies = require('js-cookie');
var ReactRouter = require('react-router');

var AjaxHelpers = require("./AjaxHelpers");

var LoginComponent = React.createClass({
  mixins: [ReactRouter.Navigation],

  getInitialState: function() {
    return {
      context: "login",
      errorMessages: []
    };
  },

  switchContext: function(e) {
    e.preventDefault();

    var newContext;
    if(this.state.context === "login") {
      newContext = "register";
    }
    else {
      newContext = "login";
    }

    this.setState({
      context: newContext,
      errorMessages: []
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var email = React.findDOMNode(this.refs.email).value;
    var password = React.findDOMNode(this.refs.password).value;

    if(this.state.context === "login") {
      this.handleLogin(email, password);
    }
    else {
      var password2 = React.findDOMNode(this.refs.password2).value;
      this.handleRegister(email, password, password2);
    }
  },

  handleLogin: function(email, password) {
    var self = this;

    AjaxHelpers.login(email, password).done(function(data, status) {
      self.transitionTo("/");
    }).fail(function(jqXHR, status, errorThrown) {
      var errorMessages = _.map(jqXHR.responseJSON, function(value) {
        return value;
      });

      self.setState({
        errorMessages: errorMessages
      });
    });
  },

  handleRegister: function(email, password1, password2) {
    var self = this;

    AjaxHelpers.register(email, password1, password2)
      .done(function(data, status) {
        self.handleLogin(email, password1);
      })
      .fail(function(jqXHR) {
        var errorMessages = _.map(jqXHR.responseJSON, function(value) {
          return value;
        });

        self.setState({
          errorMessages: errorMessages
        });

      });
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="emailInput">Email</label>
          <input
            type="email"
            ref="email"
            className="form-control"
            id="emailInput"
            placeholder="Enter your email address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">Password</label>
          <input
            type="password"
            ref="password"
            className="form-control"
            id="passwordInput"
            placeholder="Enter your password"
          />
        </div>
        {
          this.state.context === "register"?
            <div className="form-group">
              <label htmlFor="password2Input">Confirm Password</label>
              <input
                type="password"
                ref="password2"
                className="form-control"
                id="password2Input"
                placeholder="Confirm your password"
              />
            </div>
            : undefined
        }
        <button type="submit" className="btn btn-primary">{this.state.context === "login"? "Login" : "Register"}</button>
        <br />
        {
          this.state.context === "register"?
            <span>Already have an account? <a href="" onClick={this.switchContext}> Sign in.</a></span>
            :<span>Don't have an account? <a href="" onClick={this.switchContext}>Register an account.</a></span>
        }
        <br />
        {
          this.state.errorMessages.length > 0?
            <div className="alert alert-danger">
              <ul>
                {_.map(this.state.errorMessages, function(message, index) {
                  return <li key={index}>{message}</li>
                })}
              </ul>
            </div>
            : undefined
        }
      </form>
    );
  }
});

module.exports = LoginComponent;
