const express = require("express");
const { UsersModel } = require("../models/users.model");
const usersRoutes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//
//
// SIGNUP
usersRoutes.post("/register", async (req, res) => {
  let { name, email, gender, password, age, city, is_married } = req.body;
  //
  const user = await UsersModel.find({ email });
  if (user.length > 0) {
    res.status(400).send({ message: "User already exist, please login" });
  } else {
    bcrypt.hash(password, 5, async (error, hash) => {
      const newUser = new UsersModel({
        name,
        email,
        gender,
        password: hash,
        age,
        city,
        is_married,
      });
      //
      await newUser.save();
      res.status(200).send({ message: "Account created successfully !" });
    });
  }
  //
});
// LOGIN
usersRoutes.post("/login", async (req, res) => {
  let { email, password } = req.body;
  //
  const user = await UsersModel.findOne({ email });
  if (user) {
    bcrypt.compare(password, user.password, (error, result) => {
      if (result) {
        res.status(200).send({
          message: "logged in successfully !",
          token: jwt.sign({ user_id: user.id }, "luffy"),
        });
      } else {
        res.status(400).send({ message: "Wrong password !" });
      }
    });
  } else {
    res.status(400).send({ message: "User do not exist !" });
  }
  //
});
//
//
//
module.exports = { usersRoutes };
