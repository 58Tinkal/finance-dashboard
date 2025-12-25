import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "./features/widgets/widgetSlice";

import AddWidgetModal from "./components/AddWidgetModal";
import WidgetCard from "./components/WidgetCard";
import WidgetTable from "./components/WidgetTable";
import WidgetChart from "./components/WidgetChart";

export default function App() {
  const { widgets, modalOpen } = useSelector((state) => state.widgets);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-[#0e1525] text-white p-6">
      {/* ---------------- Header ---------------- */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Finance Dashboard</h1>
        <button
          className="btn-primary"
          onClick={() => dispatch(toggleModal(true))}
        >
          + Add Widget
        </button>
      </header>

      {/* ---------------- Widgets Grid ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets.map((w) => (
          <div key={w.id}>
            {w.displayMode === "card" && <WidgetCard widget={w} />}
            {w.displayMode === "table" && <WidgetTable widget={w} />}
            {w.displayMode === "chart" && <WidgetChart widget={w} />}
          </div>
        ))}

        {/* Add More Widget Block */}
        <div
          onClick={() => dispatch(toggleModal(true))}
          className="border border-dashed border-gray-600 rounded-xl h-40 flex 
                      flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition"
        >
          <span className="text-3xl">+</span>
          <p>Add Widget</p>
        </div>
      </div>

      {/* ---------------- Modal ---------------- */}
      {modalOpen && <AddWidgetModal />}
    </div>
  );
}
