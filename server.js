const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Import Routes
const authController = require("./routes/auth");
const usersController = require("./routes/users");
const boardsController = require("./routes/boards");
const cardsController = require("./routes/cards");
const listsController = require("./routes/lists");

// Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// Connect database
// testing
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, // set default index to  createIndex as to avoid depreciation warnings
  useFindAndModify: false, // Set to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify().
});
mongoose.connection.once("open", () => {
  console.log("XXXXXXXXXXXXXX Connected to mongoose...");
});

// Routes
app.use("/api/users", usersController);
app.use("/api/auth", authController);
app.use("/api/boards", boardsController);
app.use("/api/cards", cardsController);
app.use("/api/lists", listsController);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on port:" + PORT));
