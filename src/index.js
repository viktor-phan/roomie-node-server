import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import connectDatabase from "./database/index.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes(app);
const port = 5000;
app.listen(port, async () => {
  await connectDatabase();
  console.log(`Server running at port ${port} localhost!`);
});
