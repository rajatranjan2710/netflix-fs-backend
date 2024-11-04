import { user } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokeAndSetCookie } from "../utils/generateTokenAndCookie.js";
import { owner } from "../owner.js";

export const signup = async (req, res) => {
  // console.log("Request object : ", req);
  try {
    const { email, password, username } = req.body;
    console.log("Hitting sign up", email, password, username);

    if (!email || !password || !username) {
      console.log("invalid data");
      return res.status(400).json({
        success: false,
        message: "All feilds are required",
      });
    }

    const User = await user.findOne({ email }); // finding user with email in database

    if (User) {
      // if user already exists
      console.log("User exists");
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    // console.log("generated salt");

    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log("hashed");

    //if not we'll create a new user

    const newUser = await user.create({
      email,
      password: hashedPassword,
      username,
    });

    // console.log("saved : ", newUser);

    generateTokeAndSetCookie(newUser._id, res);

    await newUser.save(); //saving new user to database

    const userToSend = await user
      .findOne({ email: newUser.email })
      .select("-password");

    // console.log(userToSend);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userToSend,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  console.log("hitting login");
  try {
    const { email, password } = req.body;
    console.warn("email :", email, "password :", password);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "ALl fields are required",
      });
    }

    let User = await user.findOne({ email });

    if (!User) {
      // if user does not exist in db

      return res.status(400).json({
        success: false,
        message: "User doesn't exists",
      });
    }

    //if user exists
    //compare password

    const passwordCorrect = await bcrypt.compare(password, User.password);

    if (!passwordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    generateTokeAndSetCookie(User._id, res);

    User = await user.findOne({ email }).select("-password");
    console.log(User);

    res.status(201).json({
      success: true,
      message: "User logged in successfully",
      user: User,
      owner_of_the_project: owner,
    });
  } catch (error) {
    console.error("Error in login controller ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt-netflix", "", {
      expires: new Date(Date.now()),
    });

    res.status(200).json({
      success: true,
      message: "Logged out succesfully",
    });
  } catch (error) {
    console.log("Error in logout controller ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const authCheck = async (req, res) => {
  try {
    console.warn("authenticated");
    res.status(200).json({
      success: true,
      message: "User is authenticated",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some internal  server error",
    });
  }
};
