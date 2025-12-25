import { useDispatch } from "react-redux";
import { removeWidget } from "../features/widgets/widgetSlice";
import useWidgetData from "../utils/useWidgetData";

export default function WidgetTable({ widget }) {
  const dispatch = useDispatch();
  const data = useWidgetData(widget.url, widget.interval);

  function extractRow(item, fields) {
    return fields.map((f) => f.split(".").reduce((acc, k) => acc?.[k], item));
  }

  if (!data || !Array.isArray(data))
    return (
      <div className="bg-[#112038] p-4 rounded-xl text-center">
        Invalid API. Table needs array data.
      </div>
    );

  return (
    <div className="bg-[#112038] p-4 rounded-xl border border-white/10 shadow-md relative">
      <button
        className="absolute top-2 right-2 text-red-400 hover:text-red-600"
        onClick={() => dispatch(removeWidget(widget.id))}
      >
        ✕
      </button>

      <h3 className="text-lg font-semibold mb-3">{widget.name}</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700">
            {widget.fields.map((f) => (
              <th key={f} className="py-1 text-green-300">
                {f}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.slice(0, 10).map((item, i) => (
            <tr key={i} className="border-b border-gray-800">
              {extractRow(item, widget.fields).map((value, idx) => (
                <td key={idx} className="py-1 text-gray-300">
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
