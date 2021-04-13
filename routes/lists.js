const express = require("express");
const router = express.Router();
const List = require("../models/List");

router.get("/", (req, res) => {
  res.send("Hello boards");
});

module.exports = router;
