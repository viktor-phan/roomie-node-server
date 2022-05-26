import express from "express";

const router = express.Router();

router.route("/").get((req, res) => {
  req.session.auth = true;
  console.log(req.session.id);
  res.json({ message: "Welcome to Roomie API" });
});

export default router;
