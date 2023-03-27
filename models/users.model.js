const mongoose = require("mongoose");
//
//
const usersSchema = mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  password: String,
  age: Number,
  city: String,
  is_married: Boolean,
});
//
const UsersModel = mongoose.model("user", usersSchema);
//
//
//
module.exports = { UsersModel };
