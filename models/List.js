const { Schema, model } = require("mongoose");

let express = require("express");
let cors = require("cors");

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
