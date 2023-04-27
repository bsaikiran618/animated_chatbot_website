const express = require("express");
const router = express.Router();
const mailer = require("../utils/mailer");
const multer = require("multer");
//const multerStorage = require("../utils/multerStorage");
const multerStorage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   console.log("ASDASDASDASDASDASDASDASD!@)!@)#!@)#(!@)#(!@)#(!)@#!@#");
  //   cb(null, "public");
  // },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    console.log("AKSLQJWLKIOUONLKLK!@#!()(!13235%#@%#@%$$~");
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const upload = multer({
  storage: multerStorage,
  //dest: "public/user_files",
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

router.post("/fileUpload", upload.single("document1"), (req, res)=>{
  console.log("ok");
  res.json({message: "ok"});
})

router.post("/submitForm", upload.single("document1"), (req, res) => {
  //console.log(JSON.parse(req.body.otherData));
  const userData = JSON.parse(req.body.otherData);
  console.log(req.body);

  const newUser = new User(userData);
  newUser.save();

  mailer.sendMail(userData.email, sendLinkTemplate, {
    userName: userData.firstName,
  });
  res.json({ message: "Added new user" });
});

module.exports = router;
