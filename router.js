const cnt = require("./controllers/index");
const passportCon = require("./auth/passportcon");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const LocalAuth = passport.authenticate("local", { session: false });

module.exports = function(app) {
  //protected routes  required jswttoken to access
  app.get("/",requireAuth,  (req, res) => {
    res.send({ person: "Hoo im from server" });
  });

  app.post("/signup", cnt.signup); //signup

  //signin checks in database and gives back jwt token
  app.post("/signin",LocalAuth,cnt.signin);
};
