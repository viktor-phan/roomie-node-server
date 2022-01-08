import express from "express";
import routes from "./routes/index.js";
const app = express();

routes(app);
const port = 5000;
app.listen(port, () => {
  console.log(`Server running at port ${port} localhost!`);
});
