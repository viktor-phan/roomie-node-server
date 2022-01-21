import mongoose from "mongoose";
const HouseSchema = new mongoose.Schema(
  {
    address1: { type: String, required: true, unique: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    squareFeet: { type: Number, required: true },
    capacity: { type: Number },
    room: { type: Number },
    privateBathroom: { type: Boolean },
    kitchen: { type: Boolean, required: true },
    laundry: { type: Boolean, required: true },
    wifi: { type: Boolean, required: true },
    description: { type: String },
    heater: { type: Boolean, required: true },
    photos: [{ type: String }], //to photo URL
    monthlyFee: { type: Number, required: true },
  },
  { timestamps: true }
);
const HouseModel = mongoose.model("House", HouseSchema);
export default HouseModel;
