const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();
const secret = process.env.SECRET;

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "Please provide all require fields!",
    });
    return;
  }
  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({
      username,
      password: hashedPassword,
    });
    res.send({
      message: "User registered Successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while registering a new user",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "Please provider all required fields!",
    });
    return;
  }
  try {
    const userDoc = UserModel.findOne({ username });
    if (!userDoc) {
      res.status(404).send({
        message: "User not found!",
      });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, userDoc.password);
    if (!isPasswordMatch) {
      res.status(401).send({
        message: "Invalid credentials!",
      });
      return;
    }

    //login success
    jwt.sign({ username, id: userDoc._id}, secret, {}, (err, token) => {
      if (err){
        return res.status(500).send({
          message: " Internal server error: Cannot login! cannot generate token",
        });
      }

      //token generated
      res.send({
        message: "User logged in successfully",
        id: userDoc._id,
        username,
        accessToken: token,
      })
    });
  } catch (error) {
    res.status(500).send({
      message:
      error.message ||
      "Something error occurred while logging in a new user.",
    });
  }
};
