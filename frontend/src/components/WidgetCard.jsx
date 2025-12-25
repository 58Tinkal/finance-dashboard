import { useDispatch } from "react-redux";
import { removeWidget } from "../features/widgets/widgetSlice";
import useWidgetData from "../utils/useWidgetData";
import { useTheme } from "../context/ThemeContext";

export default function WidgetCard({ widget }) {
  const dispatch = useDispatch();
  const [rawData, refresh, lastUpdated] = useWidgetData(
    widget.url,
    widget.interval
  );
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // For card, if array, use first item; else use object
  let data = rawData;
  if (Array.isArray(rawData) && rawData.length > 0) {
    data = rawData[0];
  }

  // Handle data based on card type
  let displayData = [];
  let isList = false;

  if (widget.cardType === "watchlist" || widget.cardType === "market-gainers") {
    // For list types, show multiple items
    if (Array.isArray(rawData)) {
      displayData = rawData.slice(0, 5); // Show top 5
      isList = true;
    } else {
      displayData = [data];
    }
  } else {
    // For other types, show single item as grid
    displayData = [data];
  }

  return (
    <div
      className={`rounded-xl p-5 shadow-lg border hover:shadow-xl transition relative overflow-hidden ${
        isDark
          ? "bg-gradient-to-br from-[#11263f] to-[#0f1a2e] border-white/10"
          : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2
          className={`font-semibold flex items-center gap-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {widget.name}
          <span
            className={`text-xs px-2 py-1 rounded ${
              isDark ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            {lastUpdated
              ? `${Math.floor((new Date() - lastUpdated) / 1000)}s ago`
              : `${widget.interval}s`}
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            className={`p-1 rounded hover:bg-gray-600/20 transition ${
              isDark
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
            title="Refresh"
          >
            🔄
          </button>
          <button
            className={`p-1 rounded hover:bg-gray-600/20 transition ${
              isDark
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
            title="Settings"
          >
            ⚙️
          </button>
          <button
            onClick={() => dispatch(removeWidget(widget.id))}
            className={`p-1 rounded hover:bg-red-600/20 transition ${
              isDark
                ? "text-red-400 hover:text-red-300"
                : "text-red-500 hover:text-red-700"
            }`}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Card Type Heading */}
      <div
        className={`text-sm font-semibold mb-3 ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {widget.cardType === "watchlist"
          ? "📈 Watchlist"
          : widget.cardType === "market-gainers"
          ? "📊 Market Gainers"
          : widget.cardType === "performance-data"
          ? "📉 Performance Data"
          : widget.cardType === "financial-data"
          ? "💰 Financial Data"
          : "📊 General Data"}
      </div>

      {/* Content */}
      {displayData.length > 0 &&
        (isList ? (
          // List view for watchlist/market-gainers
          <div className="space-y-2">
            {displayData.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border transition hover:shadow-md ${
                  isDark
                    ? "bg-[#1a2b45] border-white/10 hover:bg-[#1f344a]"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <div className="text-sm flex flex-wrap gap-4">
                  {widget.fields.slice(0, 3).map((key, i) => (
                    <div key={i}>
                      <span
                        className={`font-medium ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {key}:
                      </span>
                      <span
                        className={`ml-1 ${
                          isDark ? "text-green-300" : "text-green-600"
                        }`}
                      >
                        {String(
                          key.split(".").reduce((a, b) => a?.[b], item)
                        ).slice(0, 15)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Grid view for other types
          <div className="grid grid-cols-2 gap-3">
            {widget.fields.map((key, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border transition hover:shadow-md ${
                  isDark
                    ? "bg-[#1a2b45] border-white/10 hover:bg-[#1f344a]"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <div
                  className={`text-xs font-medium mb-1 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {key}
                </div>
                <div
                  className={`text-lg font-bold ${
                    isDark ? "text-green-300" : "text-green-600"
                  }`}
                >
                  {String(
                    key.split(".").reduce((a, b) => a?.[b], displayData[0])
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
