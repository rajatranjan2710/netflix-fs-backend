import express from "express";
import { authentication } from "../middleware/authentication.js";
import {
  getrandomtv,
  getSimilarTvShows,
  getTrailersOfTv,
  getTvByCategory,
  getTvDetails,
} from "../controllers/tv.controller.js";

const Router = express.Router();

Router.get("/random", authentication, getrandomtv);
Router.get("/trailers/:id", authentication, getTrailersOfTv);
Router.get("/details/:id", authentication, getTvDetails);
Router.get("/similar/:id", authentication, getSimilarTvShows);
Router.get("/:category", authentication, getTvByCategory); // for query

export default Router;
