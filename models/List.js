const { Schema, model } = require("mongoose");

var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());

const ListSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "card",
    },
  ],
});

module.exports = List = model("list", ListSchema);
