const express = require("express");
const router = express.Router();
const member = require("../middleware/user_Middleware");
const auth = require("../middleware/auth_Middleware");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Board = require("../models/Board");

let cors = require("cors");
let app = express();

app.use(cors());
// Add a board
router.post(
  "/",
  [auth, [check("title", "Title is required").not().isEmpty()]],
  async (req, res) => {
    // extract validation error from request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, backgroundURL } = req.body;

      // https://masteringjs.io/tutorials/mongoose/save#:~:text=The%20save()%20method%20is,Mongoose%20insert%20a%20new%20document.&text=If%20you%20load%20an%20existing,updates%20the%20existing%20document%20instead.

      // Create and save the board
      const newBoard = new Board({ title, backgroundURL });
      const board = await newBoard.save();

      // Add the created board to user board
      const user = await User.findById(req.user.id);

      // insert board id in to keep track of list of boards at dashboard
      user.boards.unshift(board.id);
      await user.save();

      // Add user to board so can be e dit
      board.members.push({ user: user.id, name: user.name });

      await board.save();

      res.json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Get user's boards
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const boards = [];
    for (const boardId of user.boards) {
      boards.push(await Board.findById(boardId));
    }

    res.json(boards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a board by id
router.get("/:id", auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ msg: "Board not found" });
    }

    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// change board backgorund
router.patch("/background/:id", auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ msg: "Error with images" });
    }
    board.backgroundURL = req.body.randImg;

    await board.save();
    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Image Error");
  }
});

// Change a board's title
router.patch(
  "/rename/:id",
  [auth, member, [check("title", "Title is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const board = await Board.findById(req.params.id);
      if (!board) {
        return res.status(404).json({ msg: "Board not found" });
      }

      board.title = req.body.title;
      await board.save();

      res.json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Add a board member
router.put("/addMember/:userId", [auth, member], async (req, res) => {
  try {
    const board = await Board.findById(req.header("boardId"));
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // See if already member of board
    if (
      board.members.map((member) => member.user).includes(req.params.userId)
    ) {
      return res.status(400).json({ msg: "Already member of board" });
    }

    // Add board to user's boards
    user.boards.unshift(board.id);
    await user.save();

    // Add user to board's members with 'normal' role
    board.members.push({
      user: user.id,
      name: user.name,
      role: "normal",
      avatar: user.avatar,
    });

    await board.save();

    res.json(board.members);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
