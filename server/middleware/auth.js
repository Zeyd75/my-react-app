const jwt = require("jsonwebtoken");
// const config = require("../config/auth.config");
// const db = require("../models");

exports.userAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user id !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Unauthorized!" });
  }
};
