const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

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

// Import Routes
const usersController = require("./routes/users");
const authController = require("./routes/auth");
const boardController = require("./routes/boards");
// Routes
app.use("/api/users", usersController);
app.use("/api/auth", authController);
app.use("/api/board", boardController);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log("Server running on port:" + PORT));
