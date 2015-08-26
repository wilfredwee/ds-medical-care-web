var parent;
var children;

var ReactiveStore = {
  getParent: function() {
    return parent;
  },

  setParent: function(parentToUpdate) {
    parent = parentToUpdate;
  },

  getChildren: function() {
    return children;
  },

  setChildren: function(childrenToUpdate) {
    children = childrenToUpdate;
  }
};

module.exports = ReactiveStore;
