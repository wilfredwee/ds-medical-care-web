var React = require('react');
var BaseTemplate = require('./BaseTemplate');
require('expose?$!expose?jQuery!jquery');
require("bootstrap-webpack");

var ReactRouter = require('react-router');
var Router = ReactRouter;
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;

var LoginPage = require('./pages/LoginPage');

// Define our top level RouteHandler
var Index = React.createClass({
  render: function() {
    return (
      <div>
        <BaseTemplate />
        <RouteHandler />
      </div>
    );
  }
});

// Define our Routes
var routes = (
  <Route handler={Index}>
    <Route name="login" handler={LoginPage} />
  </Route>
);

// Run our routes
Router.run(routes, Router.HashLocation, function(Root) {
  React.render(<Root />, document.body);
});
