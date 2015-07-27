require('expose?$!expose?jQuery!jquery');
require("bootstrap-webpack");

var React = require('react');
var _ = require('lodash');

var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;

var AjaxHelpers = require("./AjaxHelpers");
var ReactiveStore = require("./ReactiveStore");

var BaseTemplate = require('./BaseTemplate');
var LoginPage = require('./pages/LoginPage');
var ParentInfoPage = require('./pages/ParentInfoPage');
var ChildrenPage = require("./pages/ChildrenPage");

// Define our top level RouteHandler
var Index = React.createClass({
  getInitialState: function() {
    AjaxHelpers.getParent();

    var self = this;
    this.parentInterval = window.setInterval(function() {
      var newParent = ReactiveStore.getParent();
      if(_.isEqual(self.state.parent, newParent)) {
        return;
      }

      self.setState({
        parent: newParent
      });
    }, 200);

    return {};
  },

  componentWillUnmount: function() {
    window.clearInterval(this.parentInterval);
  },

  render: function() {
    return (
      <div>
        <BaseTemplate parent={this.state.parent}/>
        <RouteHandler parentData={this.state.parent} />
      </div>
    );
  }
});

// Define our Routes
var routes = (
  <Route handler={Index}>
    <Route name="login" handler={LoginPage} />
    <Route name="parentinfo" handler={ParentInfoPage} />
    <Route name="children" handler={ChildrenPage} />
  </Route>
);

// Run our routes
ReactRouter.run(routes, ReactRouter.HashLocation, function(Root) {
  React.render(<Root />, document.body);
});
