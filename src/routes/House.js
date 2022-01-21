import express from "express";
import House from "../models/House/index.js";
const router = express.Router();

router.route("/api/v1/house").get(async (req, res) => {
  try {
    const houses = await House.find();
    console.log("Calling to House dataset");
    res.status(200).json(houses);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.route("/api/v1/house/create").post(async (req, res) => {
  const newHouse = new House(req.body);
  try {
    const savedHouse = await newHouse.save();
    res.status(200).json({ message: success, data: savedHouse._id });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.route("/api/v1/house/:id").get(async (req, res) => {
  const house = await House.findById(req.params.id);
  res.status(200).json(house);
  try {
  } catch (error) {
    res.status(500).json(error);
  }
});
router.route("/api/v1/house/:id").put(async (req, res) => {
  const HouseId = req.params.id;
  try {
    const updatingHouse = await House.findByIdAndUpdate(
      HouseId,
      { $set: req.body },
      { new: true }
    ).catch((error) => {
      res.status(500).json(error);
    });
    res.status(200).json(updatingHouse);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.route("/api/v1/house/:id").delete(async (req, res) => {
  const HouseId = req.params.id;
  try {
    await House.findByIdAndDelete(HouseId);
    res.status(200).json({ message: `House with id ${HouseId} was deleted` });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
