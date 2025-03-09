const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  //UserSchema เป็นชื่อคลาสที่เราสร้างขึ้นมาเพื่อเก็บข้อมูลของ User
  username: { type: String, required: true, unique: true, min: 4 },
  password: {type: String, required: true },
});

const UserModel = model("User", UserSchema);
module.exports = UserModel;
