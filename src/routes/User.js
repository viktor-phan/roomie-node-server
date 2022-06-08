import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User/index.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";
import { verifyToken } from "../middleware/authentication.js";

const router = express.Router();
// Register -- HINT: always an admin with admin pasword
router.route("/api/v1/user").post(async (req, res) => {
  const newUser = new User(req.body);
  try {
    const passwordHash = await hashPassword(newUser.password);
    newUser.password = passwordHash;
    const savedUser = await newUser.save();
    const { password, ...info } = savedUser._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Find user by user name
router.route("/api/v1/user").get(async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Find user by id
router.route("/api/v1/user/:id").get(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Edit user
router.route("/api/v1/user/edit").put(async (req, res) => {
  try {
    const user = await _findUserByUsername(req.body.username);
    if (!user) {
      res.status(404).json({ message: "User not found!" });
    } else {
      const updateUser = await User.findOneAndUpdate(
        user,
        { $set: req.body },
        { new: true }
      );

      const { password, ...info } = updateUser._doc;
      req.session.user = info;
      res.status(200).json(info);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete User
router.route("/api/v1/user/delete").delete(verifyToken, async (req, res) => {
  try {
    const user = await _findUserByUsername(req.body.username);
    if (!user) {
      res.status(404).json({ message: "User not found!" });
    } else {
      User.findOneAndDelete(user, (err, result) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json({ message: "User has been deleted!" });
        }
      });
    }
  } catch (error) {}
});

const _findUserByUsername = async (username) => {
  const user = await User.findOne({ username: username });
  return user;
};

export default router;
