import express from "express";
import Example from "./Example.js";
import HouseRouter from "./House.js";
export default (app) => {
  app.use(Example);
  //more routes add below
  app.use(HouseRouter);
};
