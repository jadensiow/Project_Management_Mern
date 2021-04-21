const express = require("express");
require("dotenv").config();
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

var cors = require("cors");

app.use(cors());

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
  console.log("Connected to mongoose...");
});

// Routes
app.use("/api/users", usersController);
app.use("/api/auth", authController);
app.use("/api/boards", boardsController);
app.use("/api/cards", cardsController);
app.use("/api/lists", listsController);

let users = {};
io.on("connection", (socket) => {
  console.log("socket connected: " + socket.id);
  // socket io will link back to their own room of socket id
  socket.on("userJoin", (username) => {
    users[socket.id] = username;
    socket.join(username);
    socket.join("General");
    console.log("Users connected: " + users);
    // filter out duplicate by spreading it out and set
    io.emit("listOfUsers", [...new Set(Object.values(users))]);
  });

  // Message sent thus here receive
  socket.on("newMessage", (newMessage) => {
    // forward message to connected client
    // and only link it up to the same room name
    console.log("newmessage", newMessage);
    io.to(newMessage.room).emit("newMessage", {
      name: newMessage.name,
      msg: newMessage.msg,
      isPM: newMessage.isPM,
      time: new Date().toLocaleString(),
    });
  });

  // message for entering room and leaving
  socket.on("roomEntered", ({ oldRoom, newRoom }) => {
    socket.leave(oldRoom);
    io.to(oldRoom).emit("newMessage", {
      name: "Notice",
      msg: `${users[socket.id]} has just left the room`,
    });
    io.to(newRoom).emit("newMessage", {
      name: "Notice",
      msg: `${users[socket.id]} has just joined the room`,
    });
    socket.join(newRoom);
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("listOfUsers", [...new Set(Object.values(users))]);

    console.log("Users left: " + users[socket.id]);
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
}

server.listen(PORT, () => console.log("Server running on port:" + PORT));
