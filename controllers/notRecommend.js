import { user } from "../models/user.model.js";

export const deleteAllUsers = async (req, res) => {
  try {
    await user.deleteMany();
    res.status(201).json({
      success: true,
      message: "All users deleted successfully",
    });
  } catch (error) {
    console.log("Error in delete users", error.message);
    res.status(500).json({
      success: false,
      message: "Error deleting users",
    });
  }
};
