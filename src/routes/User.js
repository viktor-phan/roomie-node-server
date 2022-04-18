import express from "express";
import User from "../models/User/index.js";

const router = express.Router();

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

router.route("/api/v1/user").post(async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

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

router.route("/api/v1/user/edit").put(async (req, res) => {
  try {
    const user = await _findUserByUsername(req.body.username);
    if (!user) {
      res.status(404).json({ message: "User not found!" });
    } else {
      console.log(user);
      const updateUser = await User.findOneAndUpdate(
        user,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateUser);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.route("/api/v1/user/delete").delete(async (req, res) => {
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
