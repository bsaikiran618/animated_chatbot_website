const mongoose = require("mongoose");

const user = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  city: { type: String, required: true },
  dob: { type: Date, required: true },
  document1FilePath: { type: String, required: false },
  // document2FilePath: { type: String, required: true },
  // document3FilePath: { type: String, required: true },
});

module.exports = mongoose.model("user", user);
