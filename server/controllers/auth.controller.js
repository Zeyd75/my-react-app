const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models");
const User = UserModel.users;

exports.signUp = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        email: req.body.email,
        pseudo: req.body.pseudo,
        password: hash,
      };
      User.create(user)
        .then((user) =>
          res.status(201).json({ message: "User was registered successfully!" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password!",
        });
      }
      let token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        {
          expiresIn: 86400,
        },
        res.status(200).send({
          id: user.id,
          pseudo: user.pseudo,
          email: user.email,
        })
      );
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
