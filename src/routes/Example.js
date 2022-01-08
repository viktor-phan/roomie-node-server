import express from "express";

const router = express.Router();

router.route("/api/example/").get((req, res) => {
  res.json({ message: "This is an example Get route" });
});

export default router;
