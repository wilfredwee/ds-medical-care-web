require("../../stylesheets/HomePage.css")

var React = require('react');

var HomePage = React.createClass({
  render: function() {
    var jumbotronStyle = {
      background: "url('" + require("../../images/homepage-banner.png") +"') no-repeat center center fixed",
      height: "calc(100vh - 70px)",
      paddingLeft: "24px"
    };

    var divStyle = {
      marginTop: "50vh",
      marginRight: "50vh"
    };

    return (
      <div style={jumbotronStyle} className="homepage-jumbotron jumbotron">
        <div style={divStyle}>
          <p><h1>DS Medical Care</h1></p>
          <p>{"Capture your child's healthcare need in one minute, two times a day."}</p>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
