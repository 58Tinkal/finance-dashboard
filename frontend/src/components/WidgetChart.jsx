import { useDispatch } from "react-redux";
import { removeWidget } from "../features/widgets/widgetSlice";
import useWidgetData from "../utils/useWidgetData";
import { useTheme } from "../context/ThemeContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartCanvas, Chart } from "react-financial-charts";
import { CandlestickSeries } from "react-financial-charts";
import {
  XAxis as FinancialXAxis,
  YAxis as FinancialYAxis,
} from "react-financial-charts";
import { discontinuousTimeScaleProvider } from "react-financial-charts";
import { withDeviceRatio, withSize } from "react-financial-charts";

export default function WidgetChart({ widget }) {
  const dispatch = useDispatch();
  const [raw, refresh, lastUpdated] = useWidgetData(
    widget.url,
    widget.interval
  );
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Find the array data: if raw is array, use it; else find first array value
  let data = raw;
  if (raw && !Array.isArray(raw)) {
    const keys = Object.keys(raw);
    for (let key of keys) {
      if (Array.isArray(raw[key])) {
        data = raw[key];
        break;
      }
    }
  }

  if (!data || !Array.isArray(data))
    return (
      <div
        className={`p-4 rounded-xl ${isDark ? "bg-[#112038]" : "bg-gray-100"}`}
      >
        Provide API that returns array for chart.
      </div>
    );

  const chartData = data.map((item) => {
    let obj = {};
    widget.fields.forEach((f) => {
      obj[f] = f.split(".").reduce((acc, k) => acc?.[k], item);
    });
    return obj;
  });

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
          <span
            className={`text-xs px-2 py-1 rounded ${
              isDark ? "bg-blue-700" : "bg-blue-200"
            }`}
          >
            {widget.dataInterval}
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

      {/* Chart */}
      {widget.chartType === "candle" ? (
        <div style={{ height: 250 }}>
          <ChartCanvas
            height={250}
            width={400}
            ratio={1}
            margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
            data={chartData}
            xAccessor={(d) => d.date}
            xScaleProvider={discontinuousTimeScaleProvider}
            xExtents={[
              new Date(chartData[0]?.date),
              new Date(chartData[chartData.length - 1]?.date),
            ]}
          >
            <Chart id={1} yExtents={(d) => [d.high, d.low]}>
              <FinancialXAxis axisAt="bottom" orient="bottom" />
              <FinancialYAxis axisAt="right" orient="right" />
              <CandlestickSeries />
            </Chart>
          </ChartCanvas>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            {widget.fields.map((f, i) => (
              <Line
                type="monotone"
                dataKey={f}
                stroke="#4ade80"
                strokeWidth="2"
                key={i}
              />
            ))}
            <XAxis dataKey={widget.fields[0]} stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
