var React = require('react');
var ReactRouter = require("react-router")
var $ = require('jquery');
var _ = require('lodash');
var Cookies = require('js-cookie');
var AjaxHelpers = require("../AjaxHelpers");

var ParentInfoPage = React.createClass({
  render: function() {
    if(!this.props.parentData) {
      return <h1>Please login.</h1>
    }

    return (
      <div>
        <h1>To proceed, please complete your user profile.</h1>
        <br />
        <ParentInfoForm parent={this.props.parentData} />
      </div>
    );
  }
});

var ParentInfoForm = React.createClass({
  mixins: [ReactRouter.Navigation],

  handleSubmit: function(e) {
    e.preventDefault();

    var firstName = React.findDOMNode(this.refs.firstName).value;
    var lastName = React.findDOMNode(this.refs.lastName).value;
    var phoneNumber = React.findDOMNode(this.refs.phoneNumber).value.toString();
    var address = React.findDOMNode(this.refs.address).value;
    var city = React.findDOMNode(this.refs.city).value;
    var province = React.findDOMNode(this.refs.province).value;
    var postalCode = React.findDOMNode(this.refs.postalCode).value;

    // We assume that all information is updated here.
    var patchData = {
      first_name: firstName,
      last_name: lastName,
      parentprofile: {
        phone_number: phoneNumber,
        address: address,
        city: city,
        province: province,
        postal_code: postalCode
      }
    };

    var self = this;
    AjaxHelpers.updateParentInfo(patchData).done(function(data, status) {
      self.transitionTo("/children");
    }).fail(function(jqXHR) {
      // TODO: Handle error
      alert(jqXHR.responseText);
    });
  },

  render: function() {
    return (
      <div style={{maxWidth: 450}} className="container center-block">
        <div className="row">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                ref="firstName"
                className="form-control"
                id="firstName"
                placeholder="Enter your First Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                ref="lastName"
                className="form-control"
                id="lastName"
                placeholder="Enter your Last Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                ref="phoneNumber"
                className="form-control"
                id="phoneNumber"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                ref="address"
                className="form-control"
                id="address"
                placeholder="Enter your address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                ref="city"
                className="form-control"
                id="city"
                placeholder="Enter your city"
              />
            </div>
            <div className="form-group">
              <label htmlFor="province">Province</label>
              <input
                type="text"
                ref="province"
                className="form-control"
                id="province"
                placeholder="Enter your province"
              />
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                ref="postalCode"
                className="form-control"
                id="postalCode"
                placeholder="Enter your Postal Code"
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = ParentInfoPage;
