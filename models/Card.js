const { Schema, model } = require("mongoose");

var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());
const CardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  label: {
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
    },
  ],
  date: { startDate: { type: Date }, endDate: { type: Date } },
});

module.exports = Card = model("card", CardSchema);
