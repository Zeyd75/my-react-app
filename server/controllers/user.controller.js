const UserModel = require("../models");
const User = UserModel.users;

//Get all users
exports.getAllUsers = (req, res, next) => {
  User.findAll({
    attributes: {
      exclude: ["password"],
    },
  })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

//Get a single user
exports.getUserInfo = (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        return res.status(401).json({ error: "User doesn't exist" });
      }
      const user = data;
      res.status(200).json(user);
    })
    .catch((error) => res.status(500).json({ error }));
};

//Update a user
exports.updateUser = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id=" + id,
      });
    });
};

//Delete a user
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user with id=" + id,
      });
    });
};
