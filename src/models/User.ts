import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  github: { type: String },
  linkedin: { type: String },
  position: { type: String },

});

export const User = mongoose.model('User', userSchema);

