const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user_id: { type: String, required: true },
  refreshToken: { type: String },
});

const User = mongoose.model("User", userSchema);;

module.exports = User;
