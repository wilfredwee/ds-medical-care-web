require("../../stylesheets/ChildrenPage.css");
require("../../images/child-default-profile.jpg");

var Dropzone = require("react-dropzone");
var React = require('react');
var $ = require('jquery');
var _ = require('lodash');

var AjaxHelpers = require("../AjaxHelpers");
var ReactiveStore = require("../ReactiveStore");
var ModelDisplayConverter = require("../ModelDisplayConverter");

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

    return {};
  },

  componentWillUmount: function() {
    window.clearInterval(this.childrenInterval);
  },

  render: function() {
    if(!this.props.parentData) {
      return <h1>Please login</h1>;
    }

    var parentId = this.props.parentData.parentprofile.id;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            {_.map(this.state.children, function(child, index) {
              return <div key={index}><ChildComponent parentId={parentId} child={child} /><br /></div>
            })}
          <br />
          <AddChildComponent parentId={parentId} />
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    );
  }
});

var ChildComponent = React.createClass({
  editChildProfile: function(e) {
    e.preventDefault();

    var modalDOM = $("<div>").modal();

    React.render(<ChildFormModal
      parentId={this.props.parentId}
      child={this.props.child}
      modalDOM={modalDOM}/>,
      modalDOM[0]
    );

  },

  render: function() {
    var displayChild = ModelDisplayConverter.getDisplayChild(this.props.child);

    return (
      <div className="row">
        <div className="child-profile-container">
          <div className="container-fluid">
            <div className="col-md-4">
              <div className="child-profile-image-container">
                <img className="child-profile-image img-circle" src={this.props.child.picture? displayChild.picture :
                  require("../../images/child-default-profile.jpg")} />
              </div>
            </div>
            <div className="col-md-8">
              <div className="row">
                <h1>{displayChild.first_name + " " + displayChild.last_name}</h1>
              </div>
              <div className="row">
                <p>Date of Birth: {displayChild.date_of_birth}</p>
              </div>
              <div className="row">
                <p>Gender: {displayChild.gender}</p>
              </div>
              <div className="row">
                <p>Average Sleep in Hours: {this.props.child.sleep_behavior? displayChild.sleep_behavior.average_sleep : "Not filled"}</p>
              </div>
              <div className="row">
                <p>Has regular bedtimes?: {this.props.child.sleep_behavior? displayChild.sleep_behavior.has_regular_bedtime : "Not filled"}</p>
              </div>
                <div className="row">
                <p><a href="" onClick={this.editChildProfile}>Edit Profile</a></p>
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

    React.render(<ChildFormModal
      parentId={this.props.parentId}
      modalDOM={modalDOM}/>,
      modalDOM[0]
    );
  },

  render: function() {
    return (
      <div>
        <button style={{float: "right"}} className="btn btn-primary btn-lg" onClick={this.handleAddChild}>Add New Profile</button>
      </div>
    );
  }
});

var ChildFormModal = React.createClass({
  getInitialState: function() {
    var initialState = {
      errorMessages: [],
    };

    initialState.gender = this.props.child? this.props.child.gender : "male";
    initialState.hasRegularBedtime = this.props.child? this.props.child.sleep_behavior.has_regular_bedtime : "yes";

    return initialState;
  },

  componentDidMount: function() {
    var self = this;

    var modal = $(".modal.fade");

    modal.on("hidden.bs.modal", function() {
      React.unmountComponentAtNode(self.props.modalDOM[0]);
      $('.modal-backdrop').remove();
    });

    modal.modal("show");
  },

  changeGender: function(e) {
    this.setState({
      gender: e.target.value
    });
  },

  changeHasRegularBedtime: function(e) {
    this.setState({
      hasRegularBedtime: e.target.value
    });
  },

  onPictureDrop: function(files) {
    this.setState({
      pictureFile: files[0]
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var childId = this.props.child? this.props.child.id : undefined;

    var firstName = React.findDOMNode(this.refs.firstName).value;
    var lastName = React.findDOMNode(this.refs.lastName).value;
    var dob = React.findDOMNode(this.refs.dob).value;
    var gender = this.state.gender;

    var avgSleep = React.findDOMNode(this.refs.avgSleep).value;
    var hasRegularBedtime = this.state.hasRegularBedtime;
    var pictureFile = this.state.pictureFile;

    var self = this;

    AjaxHelpers.addOrPatchChild(childId, this.props.parentId, firstName, lastName, dob, gender, avgSleep, hasRegularBedtime, pictureFile)
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
    var pictureFileURL;
    // If we're editing a child, the child already has a picture and the picture has not been updated,
    // use the included picture url.
    if(this.props.child && this.props.child.picture && !this.state.pictureFile) {
      pictureFileURL = this.props.child.picture;
    }
    else {
      pictureFileURL = URL.createObjectURL(this.state.pictureFile);
    }

    var pictureStyle = {
      borderStyle: "dashed",
      margin: "auto",
      borderRadius: "50%",
      width: 170,
      height: 170,
      padding: 5
    };

    if(pictureFileURL) {
      pictureStyle.backgroundImage = "url(" + pictureFileURL + ")";
      pictureStyle.backgroundSize = "cover";
      pictureStyle.backgroundRepeat = "no-repeat";
      pictureStyle.backgroundPosition = "50% 50%";
    }

    var glyphiconStyle = {
      fontSize: "100px",
      margin: "auto",
      verticalAlign: "middle",
      display: "block",
      width: "60%",
      lineHeight: "inherit"
    };

    return (
      <div className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Complete the form for your child.</h4>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="picture">Child Profile Picture</label>
                  <Dropzone onDrop={this.onPictureDrop} style={pictureStyle} multiple={false}>
                    {pictureFileURL? null : <span className="glyphicon glyphicon-plus" style={glyphiconStyle}></span>}
                  </Dropzone>
                </div>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    ref="firstName"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter his/her First Name"
                    defaultValue={this.props.child? this.props.child.first_name : undefined}
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
                    defaultValue={this.props.child? this.props.child.last_name : undefined}
                  />
                </div>
                <div className="form-group">
                  <label className="control-label">Gender</label>
                    <div className="controls">
                      <label className="radio-inline">
                        <input
                          type="radio"
                          ref="genderMale"
                          name="genderRadio"
                          id="genderMale"
                          value="male"
                          checked={this.state.gender === "male"}
                          onChange={this.changeGender}
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
                          checked={this.state.gender === "female"}
                          onChange={this.changeGender}
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
                    defaultValue={this.props.child? this.props.child.date_of_birth : undefined}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="avgSleep">Average sleep of your child</label>
                  <input
                    type="number"
                    ref="avgSleep"
                    className="form-control"
                    id="avgSleep"
                    placeholder="In Hours"
                    defaultValue={this.props.child? this.props.child.sleep_behavior.average_sleep : undefined}
                  />
                </div>
                <div className="form-group">
                  <label className="control-label">Does your child have regular bedtimes?</label>
                    <div className="controls">
                      <label className="radio-inline">
                        <input
                          type="radio"
                          ref="regularBedtimeYes"
                          name="regularBedtimeRadio"
                          id="regularBedtimeYes"
                          value="yes"
                          checked={this.state.hasRegularBedtime === "yes"}
                          onChange={this.changeHasRegularBedtime}
                        />
                        Yes
                      </label>
                      <label className="radio-inline">
                        <input
                          type="radio"
                          ref="regularBedtimeNo"
                          name="regularBedtimeRadio"
                          id="regularBedtimeNo"
                          value="no"
                          checked={this.state.hasRegularBedtime === "no"}
                          onChange={this.changeHasRegularBedtime}
                        />
                        No
                      </label>
                      <label className="radio-inline">
                        <input
                          type="radio"
                          ref="regularBedtimeIdk"
                          name="regularBedtimeRadio"
                          id="regularBedtimeIdk"
                          value="idk"
                          checked={this.state.hasRegularBedtime === "idk"}
                          onChange={this.changeHasRegularBedtime}
                        />
                        {"I don't know"}
                      </label>
                    </div>
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
              <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ChildrenPage;
