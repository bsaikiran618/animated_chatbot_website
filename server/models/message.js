const mongoose = require("mongoose");

const message = new mongoose.Schema({
  conversationNumber: { type: String, required: true },
  //User ID 0 refers to the chatbot.
  fromUserID: { type: mongoose.Schema.Types.ObjectId, required: true },
  toUserID: { type: mongoose.Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("message", user);
