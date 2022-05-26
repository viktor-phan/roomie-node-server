import Example from "./Example.js";
import HouseRouter from "./House.js";
import UserRouter from "./User.js";
import TokenRouter from "./Session.js";

export default (app) => {
  app.use(Example);
  //more routes add below
  app.use(HouseRouter);
  app.use(UserRouter);
  app.use(TokenRouter);
};
