var Cookies = require("js-cookie");
var ReactiveStore = require("./ReactiveStore");

// Mutates input.
var setAuthRequestHeader = function(request) {
  var authToken = window.localStorage.getItem("authtoken");
  request.setRequestHeader("Authorization", "Token " + authToken);
}

var setCsrfRequestHeader = function(request) {
  var csrftoken = Cookies.get("csrftoken");

  request.setRequestHeader("X-CSRFTOKEN", csrftoken);
}

// All calls will return the ajax promise object.
var AjaxHelpers = {
  getParent: function() {
    var authToken = window.localStorage.getItem('authtoken');

    if(authToken.length <= 0) {
      return;
    }

    return $.ajax({
      url: "/rest-auth/user/",
      type: "GET",
      beforeSend: function(request) {
        setAuthRequestHeader(request);
      }
    }).done(function(data, status, jqXHR) {
      ReactiveStore.setParent(data);

      return jqXHR;
    }).fail(function(jqXHR, status, errorThrown) {
      // TODO: Handle error
      alert(errorThrown);
      return jqXHR;
    });
  },

  login: function(email, password) {
    var postData = {
      username: email,
      password: password
    };

    var self = this;

    return $.ajax({
      url: "/rest-auth/login/",
      type: "POST",
      data: postData,
      dataType: "json",
      beforeSend: function(request) {
        setCsrfRequestHeader(request);
      }
    }).done(function(data, status, jqXHR) {
      window.localStorage.setItem("authtoken", data.key);
      self.getParent();

      return jqXHR;
    }).fail(function(jqXHR, textStatus, errorThrown) {
      return jqXHR;
    });
  },

  logout: function() {
    return $.ajax({
      url: "/rest-auth/logout/",
      type: "POST",
      beforeSend: function(request) {
        setCsrfRequestHeader(request);
        setAuthRequestHeader(request);
      }
    }).done(function(data, status, jqXHR) {
      window.localStorage.setItem("authtoken", "");
      ReactiveStore.setParent(undefined);

      return jqXHR;
    }).fail(function(jqXHR, status, errorThrown) {
      // TODO: Handle error
      alert(jqXHR);
      return jqXHR;
    });
  },

  register: function(email, password1, password2) {
    var postData = {
      username: email,
      email: email,
      password1: password1,
      password2: password2,
    };

    return $.ajax({
      url: "/rest-auth/registration/",
      type: "POST",
      data: postData,
      dataType: "json",
      beforeSend: function(request) {
        setCsrfRequestHeader(request);
      }
    });
  }
};

module.exports = AjaxHelpers;
