var React = require('react');
var App = require('./app');
require('expose?$!expose?jQuery!jquery')
require("bootstrap-webpack");

React.render(<App/>, document.getElementById('react-app'));
