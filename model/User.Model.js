const mongoose = require("mongoose");

const socialSchema = mongoose.Schema({
  name: String,
  email: String,
  website: String,
  mobile:Number,
  password: String,
});

const UserModel = mongoose.model("user", socialSchema);

module.exports = {
  UserModel,
};
