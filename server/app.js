//imports
require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const formRouter = require("./routers/formRouter.js");
// constants
const port = process.env.PORT || 8000;

//initializing
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
//console.log("Connection string is: " + process.env.MONGODB_CONNECTION_STRING);
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to the DB");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/", formRouter);
