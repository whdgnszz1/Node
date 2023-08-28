import mongoose from "mongoose";

const postsSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true, 
    },
    password: {
      type: String,
      required: true, 
    },
    title: {
      type: String, 
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postsSchema);
