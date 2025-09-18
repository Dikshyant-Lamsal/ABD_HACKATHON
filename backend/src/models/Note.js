import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true }, // extracted or written text
    fileUrl: { type: String }, // optional: link to uploaded file
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
