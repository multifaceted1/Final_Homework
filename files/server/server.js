var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash    = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var db = require('./config/database.js');

var routes = require('./controller/routes.js');

require('./config/passport')(passport, db);
var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
//---------added server.js for dog app (only was '/',routes and port change) -----------------

//middleware that connects your imported routes to the routes of your application
//app.use('/', routes);   ...   line 22 deleted due to conflict.

//this is how you set the port number in order to have your app work with heroku
//this is saying "if there is an environment variable called PORT, then use that"
//if there is not an environment variable called PORT, then use 3000 as the port number
var PORT = process.env.PORT || 3000;

//more passport app below:
//middleware that is used to make passport work, as well as work with the pg client
//Your sessions table stores sessions of people who are logged in
app.use(morgan('dev')); // log every request to the consolee
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
	secret: "secret",
	resave : true,
	saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

require('./controller/routes.js')(app, passport, db);
app.use(express.static('./client'));

//cancled out for the port 3000 to be consistent.  var PORT = process.env.PORT || 8000;

app.listen(PORT, function(){
	console.log("Listening on PORT " + PORT);
});
