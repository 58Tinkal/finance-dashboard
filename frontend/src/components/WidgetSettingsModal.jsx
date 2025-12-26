import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTitle, updateWidget } from "../features/widgets/widgetSlice";
import axios from "axios";
import { extractKeys } from "../utils/extractKeys";
import { useTheme } from "../context/ThemeContext";

export default function WidgetSettingsModal({ widget, onClose }) {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [name, setName] = useState(widget.name);
  const [url, setUrl] = useState(widget.url);
  const [interval, setInterval] = useState(widget.interval);
  const [apiData, setApiData] = useState(null);
  const [availableFields, setAvailableFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState(widget.fields || []);
  const [displayMode, setDisplayMode] = useState(widget.displayMode || "card");
  const [cardType, setCardType] = useState(widget.cardType || "general");
  const [chartType, setChartType] = useState(widget.chartType || "line");
  const [dataInterval, setDataInterval] = useState(
    widget.dataInterval || "daily"
  );
  const [fieldFormats, setFieldFormats] = useState(widget.fieldFormats || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchfield, setSearchfield] = useState("");

  const testAPI = async () => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      setApiData(res.data);
      setAvailableFields(extractKeys(res.data));
      setError("");
    } catch {
      setError("API request failed. Check URL or CORS.");
      setApiData(null);
      setAvailableFields([]);
    }
    setLoading(false);
  };

  const handleSave = () => {
    dispatch(editTitle({ id: widget.id, name }));
    dispatch(updateWidget({ id: widget.id, updates: { interval } }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className={`w-full max-w-sm sm:max-w-md p-4 sm:p-6 rounded-xl shadow-xl border backdrop-blur-lg ${
          isDark ? "bg-[#112235] border-white/10" : "bg-white border-gray-300"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-xl font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Widget Settings
          </h2>
          <button
            className={`text-xl ${
              isDark
                ? "text-gray-400 hover:text-red-400"
                : "text-gray-500 hover:text-red-500"
            }`}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <label
          className={`text-xs font-medium ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Widget Name
        </label>
        <input
          className={`w-full px-3 py-2 rounded-md text-sm outline-none border focus:border-green-500/70 transition mb-4 ${
            isDark
              ? "bg-[#1a2b45] border-white/10 text-white"
              : "bg-gray-50 border-gray-300 text-gray-900"
          }`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label
          className={`text-xs font-medium ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Refresh Interval (seconds)
        </label>
        <input
          type="number"
          className={`w-full px-3 py-2 rounded-md text-sm outline-none border focus:border-green-500/70 transition mb-4 ${
            isDark
              ? "bg-[#1a2b45] border-white/10 text-white"
              : "bg-gray-50 border-gray-300 text-gray-900"
          }`}
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button className="btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
