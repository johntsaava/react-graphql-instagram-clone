import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    caption: { type: String, required: true },
    pictureUrl: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
