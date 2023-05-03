const mongoose = require("mongoose");

const message = new mongoose.Schema({
  // conversationNumber: { type: String, required: true },
  //User ID 0 refers to the chatbot.

  userID: { type: mongoose.Schema.Types.ObjectId, required: true },
  isReply: { type: mongoose.Schema.Types.Boolean, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("message", message);
