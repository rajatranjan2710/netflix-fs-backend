import mongoose from "mongoose";
import { ENV_VARS } from "./envVar.js";

export const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("Connected to database :", connection.host);
  } catch (error) {
    console.log("Error COnnecting to database :", error);
    process.exit(1); // termination of program
  }
};
