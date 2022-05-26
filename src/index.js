import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import connectDatabase from "./database/index.js";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import connectMongodbSession from "connect-mongodb-session";

const result = dotenv.config({ silent: true });
const app = express();
const port = process.env.PORT || 5000;
const MongoDBStore = connectMongodbSession(session);
const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/roomie",
  collection: "roomieSessions",
});

store.on("error", (err) => {
  console.log(err);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

routes(app);
app.listen(port, async () => {
  await connectDatabase();
  console.log(`Server running at port ${port} localhost!`);
});
