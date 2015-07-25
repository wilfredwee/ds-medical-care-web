var parent;

var ReactiveStore = {
  getParent: function() {
    return parent;
  },

  setParent: function(parentToUpdate) {
    parent = parentToUpdate;
  }
};

module.exports = ReactiveStore;
