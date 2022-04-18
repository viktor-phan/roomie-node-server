import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User/index.js";
import { comparePasswords } from "../helpers/bcrypt.helper.js";

const router = express.Router();

// Login
router.route("/api/v1/login").post(async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json({ message: "Wrong password or username" });
      return;
    }
    const validPassword = await comparePasswords(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(401).json({ message: "Wrong password or username" });
      return;
    }

    const accessToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    const { password, ...info } = user._doc;

    res.status(200).json({ accessToken, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
