const express = require("express");
const router = express.Router();
const mailer = require("./mailer");
const multer = require("multer");
const multerStorage = require("./multerStorage");
const upload = multer({
  storage: multerStorage,
  // limits: { fileSize: 10 * Math.pow(10, 6) },
});
const { sendLinkTemplate } = require("./email_templates/templates");

const User = require("./models/user");

router.post("/submitForm", upload.single("document1"), (req, res) => {
  console.log(JSON.parse(req.body.otherData));
  const userData = JSON.parse(req.body.otherData);

  const newUser = new User(userData);
  newUser.save();

  mailer.sendMail(userData.email, sendLinkTemplate, {
    userName: userData.firstName,
  });
  res.json({ message: "Yello mello u dumma fello" });
});

module.exports = router;
