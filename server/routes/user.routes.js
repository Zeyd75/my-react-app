const express = require("express");
const router = require("express").Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

// Auth
router.post("/register", authController.signUp);
router.post("/login", authController.login);
//router.get("/logout", authController.logout);

// User db
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
