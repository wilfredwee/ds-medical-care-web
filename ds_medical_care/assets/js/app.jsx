var React = require('react');
var $ = require('jquery');

module.exports = React.createClass({
   render: function(){
       return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">DS Medical Care</a>
            </div>
          </div>
        </nav>
      );
   }
});
