import express from "express";
import { authentication } from "../middleware/authentication.js";
import {
  deleteHistory,
  getHistory,
  searchMovie,
  searchPerson,
  searchTvShow,
} from "../controllers/search.controller.js";

const Router = express.Router();

Router.get("/person/:query", authentication, searchPerson);
Router.get("/movie/:query", authentication, searchMovie);
Router.get("/tv/:query", authentication, searchTvShow);
Router.get("/history", authentication, getHistory);
Router.delete("/history/:id", authentication, deleteHistory);

export default Router;
