//modules used for passport
module.exports = (passport, db) => {
  var LocalStrategy = require('passport-local').Strategy;
  var bcrypt = require('bcrypt-nodejs');
  /* passport functions used to authenticate user */

  //this is all of the behind the scenes middleware the passport module uses to authenticate a user

  passport.serializeUser(function(user,done){
  	//console.log(user)
  	done(null, user);
  });

  passport.deserializeUser(function(obj,done){
  	//console.log(obj)
  	done(null, obj);
  });

  //look for the local-signin used in one of the routes below
  //basically, this below function is called where this 'strategy' is used in the route below
  passport.use('local-signin', new LocalStrategy({
  	usernameField: 'username',
  	passwordField: 'password',
  	passReqToCallback: true
  },
  function(req, username, password, done){
  	//checking to see if the user exists, and then doing a password check
  	//if all clear, then return done(null, user[0]) is used in req.login
  	process.nextTick(function(){
  		db.query("SELECT * FROM users WHERE username='" + username + "'", (err, user) => {
  			if(user.length < 1)
  				return done(null, false, {message: 'no user'});
  	        if (!bcrypt.compareSync(password, user[0].password)){
  	          return done(null, false, {message: 'incorrect password'});
  	        }
  			return done(null, user[0]);
  		});
  	});
  }));

  //look for the local-signup used in one of the routes below
  //basically, this below function is called where this 'strategy' is used in the route below
  passport.use('local-signup', new LocalStrategy({
  	usernameField: 'username',
  	passwordField: 'password',
  	passReqToCallback: true
  },
  function(req, username, password, done){
  	process.nextTick(function(){
  		db.query("SELECT username FROM users WHERE username='" + username + "'", (err, user) => {
  			if(user.length > 0){
  				return done(null, false, {message: 'username taken'});
  			} else {
  				var salt = bcrypt.genSaltSync(10);
  				var hashedPassword = bcrypt.hashSync(password, salt);
  				var query = "INSERT INTO users (name, username, password) VALUES ('"+req.body.name+"','"+username+"','"+hashedPassword+"')";
  				db.query(query, (error,queryRes) => {
  					if(error){
  						console.error(error)
  					} else {
  						return done(null, queryRes)
  					}
  				});
  			};
    		});
      });
  }));
}
