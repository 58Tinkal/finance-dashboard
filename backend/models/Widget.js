import mongoose from "mongoose";

const widgetSchema = new mongoose.Schema({
  name: String,
  url: String,
  interval: Number,
  fields: [String],
  displayMode: String,
  cardType: { type: String, default: 'general' },
  chartType: { type: String, default: 'line' },
  dataInterval: { type: String, default: 'daily' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Widget", widgetSchema);
