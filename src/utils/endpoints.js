import express from "express";
import routes from "../routes/index.js";
import listEndpoints from "express-list-endpoints";
const app = express();
routes(app);
listEndpoints(app).forEach((endpoint) => console.log(endpoint["path"]));
