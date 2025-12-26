import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleModal, addWidget } from "../features/widgets/widgetSlice";
import axios from "axios";
import { extractKeys } from "../utils/extractKeys";
import { useTheme } from "../context/ThemeContext";

export default function AddWidgetModal() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [interval, setInterval] = useState(30);

  const [apiData, setApiData] = useState(null);
  const [availableFields, setAvailableFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [displayMode, setDisplayMode] = useState("card");
  const [cardType, setCardType] = useState("general");
  const [chartType, setChartType] = useState("line");
  const [dataInterval, setDataInterval] = useState("daily");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchfield, setSearchfield] = useState("");
  const [fieldFormats, setFieldFormats] = useState({});

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

  const handleAddWidget = () => {
    dispatch(
      addWidget({
        id: Date.now(),
        name,
        url,
        interval,
        fields: selectedFields,
        displayMode,
        cardType,
        chartType,
        dataInterval,
        fieldFormats,
      })
    );
    dispatch(toggleModal(false));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      {/*  Modal Box */}
      <div
        className={`w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[92vh] overflow-y-auto 
      p-4 sm:p-6 rounded-xl shadow-xl border backdrop-blur-lg ${
        isDark ? "bg-[#112235] border-white/10" : "bg-white border-gray-300"
      }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-xl font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Add New Widget
          </h2>
          <button
            className={`text-xl ${
              isDark
                ? "text-gray-400 hover:text-red-400"
                : "text-gray-500 hover:text-red-500"
            }`}
            onClick={() => dispatch(toggleModal(false))}
          >
            ✕
          </button>
        </div>

        {/* INPUTS */}
        <label
          className={`text-xs font-medium ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Widget Name
        </label>
        <input
          className={`w-full px-3 py-2 rounded-md text-sm outline-none border focus:border-green-500/70 transition ${
            isDark
              ? "bg-[#1a2b45] border-white/10 text-white"
              : "bg-gray-50 border-gray-300 text-gray-900"
          }`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Bitcoin Price Tracker"
        />

        <label className="text-xs text-gray-400 mt-3 block font-medium">
          API URL
        </label>
        <div className="flex gap-2">
          <input
            className={`flex-1 px-3 py-2 rounded-md text-sm outline-none border focus:border-green-500/70 transition ${
              isDark
                ? "bg-[#1a2b45] border-white/10 text-white"
                : "bg-gray-50 border-gray-300 text-gray-900"
            }`}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g. https://api.coincap.io/v2/assets"
          />
          <button
            className={`w-20 px-3 py-1 rounded-md border hover:bg-gray-700/40 transition ${
              isDark
                ? "border-gray-600 text-gray-300"
                : "border-gray-400 text-gray-700 hover:bg-gray-100"
            }`}
            onClick={testAPI}
          >
            {loading ? "..." : "Test"}
          </button>
        </div>

        <label className="text-xs text-gray-400 mt-3 block font-medium">
          Refresh Interval (seconds)
        </label>
        <input
          type="number"
          className={`w-full px-3 py-2 rounded-md text-sm outline-none border focus:border-green-500/70 transition ${
            isDark
              ? "bg-[#1a2b45] border-white/10 text-white"
              : "bg-gray-50 border-gray-300 text-gray-900"
          }`}
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
        />

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        {apiData && (
          <p className="text-green-400 text-sm mt-2">
            ✓ API connected successfully!
          </p>
        )}

        {/* Display Mode */}
        {apiData && (
          <>
            <p className="text-sm font-medium mt-4">Display Mode</p>
            <div className="flex gap-2 mt-2">
              {["card", "table", "chart"].map((type) => (
                <button
                  key={type}
                  className={`px-3 py-1 rounded-md border text-sm transition
                  ${
                    displayMode === type
                      ? "bg-green-600 border-green-400"
                      : "border-gray-600 hover:bg-gray-700"
                  }`}
                  onClick={() => setDisplayMode(type)}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>

            {/*  Chart Type (only for chart mode) */}
            {displayMode === "chart" && (
              <>
                <p className="text-sm font-medium mt-4">Chart Type</p>
                <div className="flex gap-2 mt-2">
                  {["line", "candle"].map((type) => (
                    <button
                      key={type}
                      className={`px-3 py-1 rounded-md border text-sm transition
                      ${
                        chartType === type
                          ? "bg-green-600 border-green-400"
                          : "border-gray-600 hover:bg-gray-700"
                      }`}
                      onClick={() => setChartType(type)}
                    >
                      {type.toUpperCase()}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Data Interval (for chart mode)*/}
            {displayMode === "chart" && (
              <>
                <p className="text-sm font-medium mt-4">Data Interval</p>
                <div className="flex gap-2 mt-2">
                  {["daily", "weekly", "monthly"].map((interval) => (
                    <button
                      key={interval}
                      className={`px-3 py-1 rounded-md border text-sm transition
                      ${
                        dataInterval === interval
                          ? "bg-green-600 border-green-400"
                          : "border-gray-600 hover:bg-gray-700"
                      }`}
                      onClick={() => setDataInterval(interval)}
                    >
                      {interval.toUpperCase()}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/*Card Type (only for card mode) */}
            {displayMode === "card" && (
              <>
                <p className="text-sm font-medium mt-4">Card Type</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {[
                    "general",
                    "watchlist",
                    "market-gainers",
                    "performance-data",
                    "financial-data",
                  ].map((type) => (
                    <button
                      key={type}
                      className={`px-3 py-1 rounded-md border text-sm transition
                      ${
                        cardType === type
                          ? "bg-green-600 border-green-400"
                          : "border-gray-600 hover:bg-gray-700"
                      }`}
                      onClick={() => setCardType(type)}
                    >
                      {type.replace("-", " ").toUpperCase()}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Field Search*/}
            <p className="text-sm font-medium mt-5">Available Fields</p>
            <input
              className="input-field mb-2"
              placeholder="Search fields..."
              onChange={(e) => setSearchfield(e.target.value.toLowerCase())}
            />

            {/* Field List */}
            <div className="h-40 overflow-y-auto border border-gray-700 rounded-md p-2 text-xs">
              {availableFields
                .filter((f) => f.toLowerCase().includes(searchfield))
                .map((f) => (
                  <div
                    key={f}
                    className="flex justify-between items-center hover:bg-white/10 p-1 rounded"
                  >
                    <span>{f}</span>
                    <button
                      className="text-green-400 font-bold"
                      onClick={() =>
                        !selectedFields.includes(f) &&
                        setSelectedFields([...selectedFields, f])
                      }
                    >
                      +
                    </button>
                  </div>
                ))}
            </div>

            {/* Selected Fields */}
            <p className="text-sm font-medium mt-3">Selected Fields</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedFields.map((f) => (
                <span
                  key={f}
                  className="bg-green-700 px-2 py-1 rounded text-xs flex items-center gap-1"
                >
                  {f}
                  <button
                    onClick={() =>
                      setSelectedFields(selectedFields.filter((s) => s !== f))
                    }
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Field Formats */}
            {selectedFields.length > 0 && (
              <>
                <p className="text-sm font-medium mt-4">Field Formats</p>
                <div className="mt-2 space-y-2">
                  {selectedFields.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <span className="text-sm w-32">{f}:</span>
                      <select
                        className={`flex-1 px-2 py-1 rounded text-sm ${
                          isDark
                            ? "bg-[#1a2b45] border-white/10 text-white"
                            : "bg-gray-50 border-gray-300 text-gray-900"
                        }`}
                        value={fieldFormats[f] || "none"}
                        onChange={(e) =>
                          setFieldFormats({
                            ...fieldFormats,
                            [f]: e.target.value,
                          })
                        }
                      >
                        <option value="none">None</option>
                        <option value="currency">Currency</option>
                        <option value="percentage">Percentage</option>
                        <option value="number">Number</option>
                      </select>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/*Footer Buttons */}
        <div className="sticky bottom-0 bg-[#112235] pt-5 pb-1 flex justify-end gap-3 mt-6">
          <button
            className="btn-outline"
            onClick={() => dispatch(toggleModal(false))}
          >
            Cancel
          </button>
          <button
            className="btn-primary"
            onClick={handleAddWidget}
            disabled={!apiData}
          >
            Add Widget
          </button>
        </div>
      </div>
    </div>
  );
}
