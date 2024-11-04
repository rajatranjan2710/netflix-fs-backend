import jwt from "jsonwebtoken";
import { ENV_VARS } from "./envVar.js";

export const generateTokeAndSetCookie = async (userId, res) => {
  // console.log("userId : ", userId);
  const Token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET);

  console.log("cookie generated");
  console.log(typeof ENV_VARS.NODE_ENV);
  res.cookie("jwt-netflix", Token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in miliseconds
    // sameSite: "none",
    secure: ENV_VARS.NODE_ENV === "production",
  });
  console.log("cookie delieverd");
};
