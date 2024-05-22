import mongoose from "mongoose";

const User = mongoose.Schema(
  {
    email:String,
  }
);

export default mongoose.models.User || mongoose.model("User", User);