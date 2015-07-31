require("../../stylesheets/ChildrenPage.css")
require("../../images/child-default-profile.jpg")

var React = require('react');
var $ = require('jquery');
var _ = require('lodash');

var AjaxHelpers = require("../AjaxHelpers");
var ReactiveStore = require("../ReactiveStore");

var ChildrenPage = React.createClass({
  getInitialState: function() {
    var children = AjaxHelpers.getChildren();

    var self = this;
    this.childrenInterval = window.setInterval(function() {
      var reactiveChildren = ReactiveStore.getChildren();

      if(!_.isEqual(reactiveChildren, self.state.children) && self.isMounted()) {
        self.setState({
          children: reactiveChildren
        });
      }
    }, 200);

    return {
      children: children
    };
  },

  componentWillUmount: function() {
    window.clearInterval(this.childrenInterval);
  },

  render: function() {
    if(!this.props.parentData) {
      return <h1>Please login</h1>;
    }

    return (
      <div className="container">
        <h1>Hello, {this.props.parentData.first_name}</h1>
        <br />
        <div className="container">
          {_.map(this.state.children, function(child, index) {
            return <ChildComponent key={index} child={child} />
          })}
        </div>
        <br />
        <AddChildComponent parentId={this.props.parentData.parentprofile.id} />
      </div>
    );
  }
});

var ChildComponent = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="child-profile-container">
          <div className="container-fluid">
            <div className="col-md-4">
              <div className="child-profile-image">
                <img className="img-responsive img-circle" src={require("../../images/child-default-profile.jpg")} />
              </div>
            </div>
            <div className="col-md-8">
              <div className="row">
                <h1>{this.props.child.first_name + " " + this.props.child.last_name}</h1>
              </div>
              <div className="row">
                <p>Date of Birth: {this.props.child.date_of_birth}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

var AddChildComponent = React.createClass({
  handleAddChild: function(e) {
    e.preventDefault();

    var modalDOM = $("<div>").modal();

    React.render(<AddChildModal
      parentId={this.props.parentId}
      modalDOM={modalDOM}/>,
      modalDOM[0]
    );
  },

  render: function() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.handleAddChild}>Add a Child</button>
      </div>
    );
  }
});

var AddChildModal = React.createClass({
  getInitialState: function() {
    return {
      errorMessages: []
    };
  },

  componentDidMount: function() {
    var self = this;

    var modal = $(".modal.fade")

    modal.on("hidden.bs.modal", function() {
      React.unmountComponentAtNode(self.props.modalDOM[0]);
      $('.modal-backdrop').remove();
    });

    modal.modal("show");
  },

  addChild: function(e) {
    e.preventDefault();

    var firstName = React.findDOMNode(this.refs.firstName).value;
    var lastName = React.findDOMNode(this.refs.lastName).value;
    var dob = React.findDOMNode(this.refs.dob).value;

    var self = this;

    AjaxHelpers.addChild(this.props.parentId, firstName, lastName, dob)
      .done(function() {
        $(".modal.fade").modal("hide");
        // $('.modal-backdrop').remove();
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
      <div className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add a Child</h4>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    ref="firstName"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter his/her First Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    ref="lastName"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter his/her Last Name"
                  />
                </div>
                <div className="form-group">
                  <label className="control-label">Gender</label>
                    <div class="controls">
                      <label className="radio-inline">
                        <input
                          type="radio"
                          ref="genderMale"
                          name="genderRadio"
                          id="genderMale"
                          value="male"
                          defaultChecked
                        />
                        Male
                      </label>
                      <label className="radio-inline">
                        <input
                          type="radio"
                          ref="genderFemale"
                          name="genderRadio"
                          id="genderFemale"
                          value="female"
                        />
                        Female
                      </label>
                    </div>
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    ref="dob"
                    className="form-control"
                    id="dob"
                  />
                </div>
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
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={this.addChild}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ChildrenPage;
