import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  searchHistory: {
    type: Array,
    default: [],
  },
  profile: {
    type: String,
    default:
      "https://imgs.search.brave.com/tk-DHYa8-ceby19GA7OLpLNRA0SMbzPWYGujj7R8QFc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvbmV0/ZmxpeC1wcm9maWxl/LXBpY3R1cmVzLTEw/MDAteC0xMDAwLXFv/OWg4MjEzNHQ5bnYw/ajAuanBn",
  },
});

export const user = mongoose.model("User", userSchema);
