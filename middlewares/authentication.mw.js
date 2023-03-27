const jwt = require("jsonwebtoken");
//
//
const authentication = (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  //
  //
  if (token) {
    const decoded = jwt.verify(token, "luffy");
    //
    //
    if (decoded) {
      req.body.user_id = decoded.user_id;
      next();
    } else {
      res.status(400).send({ message: "Please login first !" });
    }
  } else {
    res.status(400).send({ message: "Please login first !" });
  }
};
//
//
//
module.exports = { authentication };
