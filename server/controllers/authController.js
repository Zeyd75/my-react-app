const UserModel = require("../models");
const User = UserModel.users;

exports.signUp = (req, res, next) => {
  console.log(req.body);

  const { pseudo, email, password } = req.body;
  User.create({ pseudo, email, password })
    .then((user) => res.status(201).json({ message: "Utilisateur créé!" }))
    .catch((error) => res.status(400).json({ error }));
};
