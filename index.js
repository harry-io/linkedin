const express = require("express");
const { connection } = require("./db");
const { authentication } = require("./middlewares/authentication.mw");
const { postsRoutes } = require("./routes/posts.routes");
const { usersRoutes } = require("./routes/users.routes");
const app = express();
//
//
//
app.use(express.json());

//
//
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Linkedin !");
});
//
//
app.use("/users", usersRoutes);
app.use(authentication);
app.use("/posts", postsRoutes);
//
//
//
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MONGO DB !");
    console.log(`Server running at port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
