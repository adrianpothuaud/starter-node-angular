// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port

// parse various different custom JSON types as JSON
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("DataBase Connected !")
  // start app ===============================================
  app.listen(port);
  console.log('Magic happens on port ' + port); 			// shoutout to the user
  exports = module.exports = app; 						// expose app
});
