const md5 = require("md5");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let hashValue = md5(file.originalname + Date.now());
    pathValue = path.join(
      __dirname,
      "./av_chatbot_upload_files",
      hashValue.slice(0, 1),
      hashValue.slice(0, 2)
    );

    console.log("HALLO 0910239-12093-10293-10293-102939-12093-");

    var stat = null;
    try {
      stat = fs.statSync(pathValue);
    } catch (err) {
      fs.mkdirSync(pathValue, { recursive: true });
    }
    if (stat && !stat.isDirectory()) {
      throw new Error(
        'Directory cannot be created because an inode of a different type exists at "' +
          pathValue +
          '"'
      );
    }
    cb(null, pathValue);
  },
  filename: function (req, file, cb) {
    console.log("askdjalskdjalskdjalskjdlaksjdalksjdlaksjd13123123123");
    fileName =
      md5(file.originalname + String(Date.now())) +
      "." +
      file.mimetype.substring(file.mimetype.indexOf("/") + 1);
    return cb(null, fileName);
  },
});

module.exports = storage;
