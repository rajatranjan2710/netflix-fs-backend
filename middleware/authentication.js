import jwt from "jsonwebtoken";
import { user } from "../models/user.model.js";
import { ENV_VARS } from "../utils/envVar.js";

export const authentication = async (req, res, next) => {
  try {
    // console.warn("hitting token authetication");
    // console.log(req.cookies);
    const Token = req.cookies["jwt-netflix"];
    // console.log("Token here is :" + Token);

    if (!Token) {
      return res.status(404).json({
        success: false,
        message: "Token not found",
      });
    }
    // console.log(Token);

    const decoded = jwt.verify(Token, ENV_VARS.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid token",
      });
    }
    // console.log(decoded);

    const User = await user.findById(decoded.userId);
    if (!User) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = User;
    // console.log("user is ", User);
    console.warn("User authenticated");
    next();
  } catch (error) {
    console.error("Error in authentication middleware", error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
