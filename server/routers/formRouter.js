const express = require("express");
const router = express.Router();
const mailer = require("../utils/mailer");
const multer = require("multer");
//const multerStorage = require("../utils/multerStorage");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("ASDASDASDASDASDASDASDASD!@)!@)#!@)#(!@)#(!@)#(!)@#!@#");
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const upload = multer({
  storage: multerStorage,
  onFileUploadStart: function (file) {
    console.log(file.fieldname + " is starting ...");
  },
  onFileUploadData: function (file, data) {
    console.log(data.length + " of " + file.fieldname + " arrived");
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + " uploaded to  " + file.path);
  },
});
const { sendLinkTemplate } = require("../email_templates/templates");

const User = require("../models/user");
const message = require("../models/message");

const { config } = require("dotenv");
config();
const { Configuration, OpenAIApi } = require("openai");
const expiryChecker = require("../utils/expiryChecker");
const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
);

router.post("/submitForm", upload.single("document1"), (req, res) => {
  //console.log(JSON.parse(req.body.otherData));
  let userData = JSON.parse(req.body.otherData);
  console.log(req.body);

  let currentTime = new Date();
  var expiryTime = new Date(currentTime.getTime() + 5 * 60000);

  userData = { ...userData, validTill: expiryTime.toISOString() };

  const newUser = new User(userData);
  newUser.save();

  mailer.sendMail(userData.email, sendLinkTemplate, {
    userName: userData.firstName,
    conversationKey: String(newUser._id),
  });
  res.json({ message: "Added new user" });
});

router.post("/newMessage", expiryChecker, (req, res) => {
  const { userID, content, messageHistory } = req.body;
  if (content.trim().length > 0) {
    const userMessage = new message({ userID, isReply: false, content });
    userMessage.save();
    openAi
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [...messageHistory, { role: "user", content: content }],
      })
      .then((response) => {
        let msg = response.data.choices[0].message.content;
        console.log("msg before: " + msg);
        const badPrefix1 = "As an AI language model,";
        const badPrefix2 = "as an AI language model,";

        if (msg.includes(badPrefix1) || msg.includes(badPrefix2)) {
          msg = msg.replace(badPrefix1, "");
          msg = msg.replace(badPrefix2, "");
        }
        console.log("msg after: " + msg);
        const responseMessage = new message({
          userID,
          isReply: true,
          content: msg,
        });
        responseMessage.save();
        res.json({ gptResponse: msg });
      })
      .catch((error) => {
        res.json({ error: error });
        console.log(error);
      });

    console.log("new message stored.");
  }
});

module.exports = router;
