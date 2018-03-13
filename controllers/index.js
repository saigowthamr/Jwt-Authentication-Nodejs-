const User = require("../database/models/user");
const jwt = require("jwt-simple");
const secret = require("../secret/appsecret").secret;

function genJwtToken(user) {
  const time = new Date();
  const config = {
    sub: user._id,
    iat: time.getTime()
  };
  var token = jwt.encode(config, secret); // config and secret

  return token;
}

module.exports = {
  signup(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return res.send("Error occcured");
      }
      if (user) {
        // veryfying email alredy aexist
        return res.status(422).send({ err: "Email already exists" });
      }
      var user = User({
        email,
        password
      });
      user.save(function(err, user) {
        if (err) {
          return res.send(err);
        }
        res.send(genJwtToken(user)); //if user successfully signup send jwt token
      });
    });
  },

  signin(req, res) {
    // passport gives  us back if user found in database
  if(req.user){
     return  res.status(200).send(genJwtToken(req.user))
  }

  }
};
