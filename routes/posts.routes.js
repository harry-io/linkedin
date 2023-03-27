const express = require("express");
const { PostsModel } = require("../models/posts.model");
const postsRoutes = express.Router();
const jwt = require("jsonwebtoken");
//
//
//
postsRoutes.get("/", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "luffy");
  let { min = 0, max = 1000000000, device, device1, device2 } = req.query;
  let query = {
    user_id: decoded.user_id,
  };
  if (min && max) {
    query.no_of_comments = { $gt: min, $lt: max };
  }

  if (device) {
    query.device = device;
  }
  if (device1 && device2) {
    query.device = { $and: [{ device: device1 }, { device: device2 }] };
  }
  //
  const { page = 1, limit = 3 } = req.query;

  if (decoded) {
    const posts = await PostsModel.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ no_of_comments: -1 });
    res.status(200).send(posts);
  } else {
    res.status(400).send({ message: "Please login first !" });
  }
  //
  //
});
//POST/ADD
postsRoutes.post("/add", async (req, res) => {
  let body = req.body;
  let newPost = new PostsModel(body);
  await newPost.save();
  res.status(200).send({ message: "Post created successfully !" });
});
//
//POSTS/TOP
postsRoutes.get("/top", async (req, res) => {
  const { page = 1, limit = 3 } = req.query;
  //
  const posts = await PostsModel.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ no_of_comments: -1 });

  res.status(200).send(posts);
});
//POSTS/UPDATE
postsRoutes.patch("/update", async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  //
  await PostsModel.findByIdAndUpdate(id, body);
  //

  res.status(200).send({ message: "Post was updated successfully !" });
});
//
//POSTS/DELETE
postsRoutes.delete("/delete", async (req, res) => {
  const { id } = req.params;
  //
  await PostsModel.findByIdAndDelete(id);
  //
  res.status(200).send({ message: "Post was deleted successfully !" });
});
//
//

module.exports = { postsRoutes };
