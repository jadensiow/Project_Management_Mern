const Board = require("../models/Board");

let express = require("express");
let cors = require("cors");
let app = express();

app.use(cors());

module.exports = async function (req, res, next) {
  const board = await Board.findById(req.header("boardId"));
  if (!board) {
    return res.status(404).json({ msg: "Unable to find board" });
  }

  const members = board.members.map((member) => member.user);
  if (members.includes(req.user.id)) {
    next();
  } else {
    res.status(401).json({ msg: "Members only board" });
  }
};
