const express = require("express");
const router = express.Router();
const book = require("./book");

router.get("/", async (req, res) => {});

router.delete("/", (req, res) => {});

router.post("/submitForm", async (req, res) => {
  console.log(req.body);
});

module.exports = router;
