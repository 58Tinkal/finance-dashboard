import { useDispatch } from "react-redux";
import { removeWidget } from "../features/widgets/widgetSlice";
import useWidgetData from "../utils/useWidgetData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function WidgetChart({ widget }) {
  const dispatch = useDispatch();
  const raw = useWidgetData(widget.url, widget.interval);

  if (!raw || !Array.isArray(raw))
    return (
      <div className="bg-[#112038] p-4 rounded-xl">
        Provide API that returns array for chart.
      </div>
    );

  const data = raw.map((item) => {
    let obj = {};
    widget.fields.forEach((f) => {
      obj[f] = f.split(".").reduce((acc, k) => acc?.[k], item);
    });
    return obj;
  });

  return (
    <div className="bg-[#112038] p-4 rounded-xl border border-white/10 shadow-md relative">
      <button
        className="absolute top-2 right-2 text-red-400 hover:text-red-600"
        onClick={() => dispatch(removeWidget(widget.id))}
      >
        ✕
      </button>

      <h3 className="text-lg font-semibold mb-3">{widget.name}</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
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
    </div>
  );
}
