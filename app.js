const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')
const config = require("./database/config");
const router = require("./router");
const app = express();

//ur mongo uri should look like
//`mongodb://yourusername:password@yoururl.mlab.com:1233/yourdbname`

mongoose
  .connect(`mongodb://${config.user}:${config.pass}@yoururl:port/yourdbname`)
  .then(suc => {
    console.log(" connected to database");
  })
  .catch(err => {
    console.log("Error occured in database");
  });

//Middlewares

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//cors
app.use(cors)



//Routing config



router(app);

//port
const port = process.env.PORT || 3010;

//starting server

app.listen(port, () => {
  console.log(`Server is up at ${port}`);
});
