var getDisplayGender = function(genderKey) {
  switch(genderKey) {
    case "male":
      return "Male";
    case "female":
      return "Female";
  }
};

var getDisplaySleepBehavior = function(sleepBehaviorObj) {
  var displaySleepBehavior = JSON.parse(JSON.stringify(sleepBehaviorObj));

  switch(displaySleepBehavior.has_regular_bedtime) {
    case "yes":
      displaySleepBehavior.has_regular_bedtime = "Yes";
      break;
    case "no":
      displaySleepBehavior.has_regular_bedtime = "No";
      break;
    case "idk":
      displaySleepBehavior.has_regular_bedtime = "I don't know";
      break;
  }

  return displaySleepBehavior;
};

// A static converter to convert the value gotten from JSON into a displayable form.
// Ideally, this should be done via OPTIONS, so that all objects can be converted
// at one go.
// This should be treated as temporary.
var ModelDisplayConverter = {
  getDisplayChild: function(modelChild) {
    // Make a copy of the child object as we don't want to mutate the data.
    var displayChild = JSON.parse(JSON.stringify(modelChild));

    // Mutate our displayChild here
    displayChild.gender = getDisplayGender(displayChild.gender);
    displayChild.sleep_behavior = getDisplaySleepBehavior(displayChild.sleep_behavior);

    return displayChild;
  }
};


module.exports = ModelDisplayConverter;
