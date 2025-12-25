import Widget from "../models/Widget.js";

// Save widget
export const createWidget = async (req, res) => {
  try {
    const widget = await Widget.create(req.body);
    res.json({ success: true, widget });
  } catch (error) {
    res.status(500).json({ error: "Failed to save widget" });
  }
};

// Get all widgets
export const getWidgets = async (req, res) => {
  try {
    const widgets = await Widget.find().sort({ createdAt: -1 });
    res.json(widgets);
  } catch (error) {
    res.status(500).json({ error: "Fetch failed" });
  }
};

// Delete widget
export const deleteWidget = async (req, res) => {
  try {
    await Widget.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
};
