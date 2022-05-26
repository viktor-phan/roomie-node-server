import express from "express";
import User from "../models/User/index.js";
import { comparePasswords } from "../helpers/bcrypt.helper.js";

const router = express.Router();

// Login
router.route("/api/v1/login").get((req, res) => {
  if (req.session.user) {
    res.status(200).json({ loggedIn: true, user: req.session.user });
  } else {
    res.status(400).json({ loggedIn: false });
  }
});

router.route("/api/v1/login").post(async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      console.log("here");
      return res.status(401).json({ message: "Wrong password or username" });
    }

    const validPassword = await comparePasswords(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({ message: "Wrong password or username" });
    }

    const { password, ...info } = user._doc;
    req.session.user = info.username;

    res.status(200).json({ message: "Logged in successfully", user: info });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Logout
router.route("/api/v1/logout").post(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json(err);
    }
  });
  res.status(200).json({ message: "Logout successfully" });
});

export default router;
