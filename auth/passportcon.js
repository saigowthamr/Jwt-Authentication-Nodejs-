const passport = require("passport");
const User = require("../database/models/user");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const secret = require("../secret/appsecret").secret;
const LocalPassport = require("passport-local");
const bcrypt = require("bcrypt");



var config = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromHeader("authorization")
};

const JwtLogin = new JwtStrategy(config, function(payload, done) {
  User.findOne({ _id: payload.sub }, function(err, user) {
    if (err) {
      return done(err, null);
    }
    if (user) {
      return done(false, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
});

const localConfig = { usernameField: "email" };

const localStrategy = new LocalPassport(localConfig, function(
  email,
  password,
  done
) {
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    bcrypt.compare(password, user.password, function(err, res) {
      if (err) {
        return done(err);
      }
      if (res) {
        return done(null, user);
      }
      if (!res) {
        return done(null, false);
      }
    });
  });
});

// Register passport to use these strategy
passport.use(JwtLogin);
passport.use(localStrategy);
