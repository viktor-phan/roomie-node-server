import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, password: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        housesForRent: [{}],
        // houseSaved: { type: String, required: true }
    },
    { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
