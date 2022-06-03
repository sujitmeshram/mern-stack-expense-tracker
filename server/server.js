//using this file I created http server

const express = require("express");
const app = express();
const cors = require("cors"); //cors for to share the data between two different origins
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;

//use middleware
app.use(cors());
app.use(express.json());

//mongodb connection
const con = require("./db/connection.js");

//using routes
app.use(require("./routes/route"));

//if we dont have db then exit
con
  .then((db) => {
    if (!db) return process.exit(1);

    //listen to the http server only when we have valid connection
    app.listen(port, () => {
      console.log(`Server is running on port: http://localhost:${port}`);
    });

    app.on("error", (err) =>
      console.log(`Failed to connect with HTTP Server: ${err}`)
    );

    //if theres error in mongodb connection
  })
  .catch((error) => {
    console.log(`Connection Failed..!${error}`);
  });
