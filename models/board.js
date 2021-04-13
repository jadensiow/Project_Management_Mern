const mongoose = require("mongoose");

const BoardSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lists: [
      {
        type: Schema.Types.ObjectId,
        ref: "List",
      },
    ],
    activity: [
      {
        text: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
    members: [
      {
        _id: false, // to prevent creation of id
        user: {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
        name: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          default: "admin",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Board", BoardSchema);
