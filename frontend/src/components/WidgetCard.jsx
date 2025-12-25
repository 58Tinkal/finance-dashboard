import { useDispatch } from "react-redux";
import { removeWidget } from "../features/widgets/widgetSlice";
import useWidgetData from "../utils/useWidgetData";

export default function WidgetCard({ widget }) {
  const dispatch = useDispatch();
  const data = useWidgetData(widget.url, widget.interval);

  function getValue(obj, path) {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  }

  if (!data) return (
    <div className="bg-[#112038] p-4 rounded-xl border border-white/10 animate-pulse text-center">
      Loading...
    </div>
  );

  return (
    <div className="bg-[#112038] p-4 rounded-xl border border-white/10 shadow-md relative">
      
      {/* Delete Button */}
      <button
        className="absolute top-2 right-2 text-red-400 hover:text-red-600"
        onClick={() => dispatch(removeWidget(widget.id))}
      >
        ✕
      </button>

      <h3 className="text-lg font-semibold mb-3">{widget.name}</h3>

      <div className="space-y-2">
        {widget.fields.map((f, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-gray-300">{f}</span>
            <span className="text-green-400 font-medium">
              {String(getValue(data, f))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
