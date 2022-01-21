import mongoose from "mongoose";

const connect = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/roomie", {
      useNewURLParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database is connected");
    })
    .catch((error) => {
      console.log(error);
    });
};
export default connect;
