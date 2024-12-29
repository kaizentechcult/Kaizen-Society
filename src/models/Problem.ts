import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  srNo: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard'],
  },
  category: {
    type: String,
    required: true,
    enum: ['WebDev', 'DSA'],
  },
});

export default mongoose.models.Problem || mongoose.model("Problem", problemSchema); 