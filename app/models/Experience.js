// grab the mongoose module
var mongoose = require('mongoose');
var ExperienceSchema = require('./ExperienceSchema.js');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Experience', ExperienceSchema);
