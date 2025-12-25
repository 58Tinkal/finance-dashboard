import mongoose from "mongoose";

const widgetSchema = new mongoose.Schema({
  name: String,
  url: String,
  interval: Number,
  fields: [String],
  displayMode: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Widget", widgetSchema);
