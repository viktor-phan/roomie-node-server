import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import connectDatabase from "./database/index.js";
import dotenv from "dotenv";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

const result = dotenv.config({ silent: true });
console.log(result.error);
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
routes(app);
const port = process.env.PORT || 5000;
app.listen(port, async () => {
  await connectDatabase();
  console.log(`Server running at port ${port} localhost!`);
});
