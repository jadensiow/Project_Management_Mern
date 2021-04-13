const mongoose = require("mongoose");

const ListSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  /*
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Card",
    },
  ],*/
  archived: {
    type: Boolean,
    required: true,
    default: false,
  },
});
module.exports = mongoose.model("List", ListSchema);
