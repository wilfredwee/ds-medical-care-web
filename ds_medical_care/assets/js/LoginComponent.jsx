var React = require('react');
var $ = require('jquery');
var Cookies = require('js-cookie')

var LoginComponent = React.createClass({
  getInitialState: function() {
    return {
      context: "login"
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var email = React.findDOMNode(this.refs.email).value;
    var password = React.findDOMNode(this.refs.password).value;

    var postData = {
      username: email,
      password: password
    };

    var csrftoken = Cookies.get("csrftoken");

    $.ajax({
      url: "/rest-auth/login/",
      type: "POST",
      data: postData,
      dataType: "json",
      beforeSend: function(request) {
        request.setRequestHeader("X-CSRFTOKEN", csrftoken)
      }
    }).done(function(successObj, status) {
      // TODO: Store token somewhere. (token = successObj.token)
    }).fail(function() {
      // TODO: Surface error message.
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
            placeholder="Enter your emal address"
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
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    );
  }
});

module.exports = LoginComponent;
