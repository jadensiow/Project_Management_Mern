const mongoose = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
