// src/models/Leave.js
import mongoose from "mongoose";

const LeaveHistorySchema = new mongoose.Schema({
  type: { type: String, enum: ["casual", "medical", "annual"], required: true },
  date: { type: String },
  time: { type: String },
  day: { type: String },
});

const LeaveSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  casual: { type: Number, default: 0 },
  medical: { type: Number, default: 0 },
  annual: { type: Number, default: 0 },
  history: { type: [LeaveHistorySchema], default: [] },
});

export default mongoose.models.Leave || mongoose.model("Leave", LeaveSchema);
