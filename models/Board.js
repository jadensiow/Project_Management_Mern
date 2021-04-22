const { Schema, model } = require("mongoose");
let express = require("express");
let cors = require("cors");
let app = express();

app.use(cors());

const BoardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lists: [
      {
        type: Schema.Types.ObjectId,
        ref: "lists",
      },
    ],
    activity: [
      {
        text: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    backgroundURL: {
      type: String,
    },
    members: [
      {
        _id: false,
        user: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
        name: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          default: "admin",
        },
        avatar: {
          type: String,
          default:
            "https://www.gravatar.com/avatar/94d093eda664addd6e450d7e9881bcad?s=32&d=identicon&r=PG",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = Board = model("board", BoardSchema);
