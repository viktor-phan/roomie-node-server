import express from "express";
import Example from "./Example.js";

export default (app) => {
  app.use(Example);
  //more routes add below
};
