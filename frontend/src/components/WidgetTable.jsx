import { useDispatch } from "react-redux";
import { removeWidget } from "../features/widgets/widgetSlice";
import useWidgetData from "../utils/useWidgetData";
import { useTheme } from "../context/ThemeContext";

export default function WidgetTable({ widget }) {
  const dispatch = useDispatch();
  const [data, refresh, lastUpdated] = useWidgetData(
    widget.url,
    widget.interval
  );
  const { theme } = useTheme();
  const isDark = theme === "dark";

  function extractRow(item, fields) {
    return fields.map((f) => f.split(".").reduce((acc, k) => acc?.[k], item));
  }

  // Find the array data: if data is array, use it; else find first array value
  let tableData = data;
  if (data && !Array.isArray(data)) {
    const keys = Object.keys(data);
    for (let key of keys) {
      if (Array.isArray(data[key])) {
        tableData = data[key];
        break;
      }
    }
  }

  if (!tableData || !Array.isArray(tableData))
    return (
      <div
        className={`p-4 rounded-xl text-center ${
          isDark ? "bg-[#112038]" : "bg-gray-100"
        }`}
      >
        Invalid API. Table needs array data.
      </div>
    );

  return (
    <div
      className={`rounded-xl p-5 shadow-lg border hover:shadow-xl transition relative overflow-hidden ${
        isDark
          ? "bg-gradient-to-br from-[#112038] to-[#0f1a2e] border-white/10"
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

      <table className="w-full text-sm">
        <thead>
          <tr
            className={`border-b ${
              isDark ? "border-gray-700" : "border-gray-300"
            }`}
          >
            {widget.fields.map((f) => (
              <th
                key={f}
                className={`py-1 ${
                  isDark ? "text-green-300" : "text-green-600"
                }`}
              >
                {f}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData.slice(0, 10).map((item, i) => (
            <tr
              key={i}
              className={`border-b ${
                isDark ? "border-gray-800" : "border-gray-200"
              }`}
            >
              {extractRow(item, widget.fields).map((value, idx) => (
                <td
                  key={idx}
                  className={`py-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {String(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
