import express from "express";
import {
  getMovieDetails,
  getMoviesbyCategory,
  getRandomMovies,
  getSimilarMovies,
  getTrailers,
} from "../controllers/movie.controller.js";
import { authentication } from "../middleware/authentication.js";

const Router = express.Router();

Router.get("/random", authentication, getRandomMovies);
Router.get("/trailers/:id", authentication, getTrailers);
Router.get("/details/:id", authentication, getMovieDetails);
Router.get("/similar/:id", authentication, getSimilarMovies);
Router.get("/:category", authentication, getMoviesbyCategory); // for query

export default Router;
