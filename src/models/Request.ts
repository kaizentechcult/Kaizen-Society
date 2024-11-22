import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  data: { type: String, required: true },
}, { timestamps: true });

export const Request = mongoose.model("Request", requestSchema);
