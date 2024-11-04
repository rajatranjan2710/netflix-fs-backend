import express from "express";
import cookieParser from "cookie-parser";
import { ENV_VARS } from "./utils/envVar.js";
import { connectDb } from "./utils/db.js";
import cors from "cors";

const app = express();

connectDb();
app.use(cookieParser()); // to parse cookie from client
app.use(express.json()); // for parsing  application/json
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "https://netflix-fs-frontend.vercel.app",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server is online");
});

app.listen(ENV_VARS.PORT, () => {
  console.log(`Server is running on port ${ENV_VARS.PORT}`); //server listening on port
});

//for cross origin resourse sharing

// importing routes
import authRouter from "./routes/user.route.js";

app.use("/api/v1/auth", authRouter);

import movieRouter from "./routes/movies.route.js";

app.use("/api/v1/movie", movieRouter);

import tvRoute from "./routes/tv.route.js";

app.use("/api/v1/tv", tvRoute);

import searchRouter from "./routes/search.route.js";

app.use("/api/v1/search", searchRouter);

//to delete all users
import { deleteAllUsers } from "./controllers/notRecommend.js";
app.delete("/delete/users", deleteAllUsers);
