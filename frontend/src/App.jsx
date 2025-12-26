import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "./features/widgets/widgetSlice";
import AddWidgetModal from "./components/AddWidgetModal";
import WidgetCard from "./components/WidgetCard";
import WidgetTable from "./components/WidgetTable";
import WidgetChart from "./components/WidgetChart";
import WidgetSettingsModal from "./components/WidgetSettingsModal";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./context/ThemeContext";
import { useState } from "react";

export default function App() {
  const { widgets, modalOpen } = useSelector((s) => s.widgets);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [settingsWidget, setSettingsWidget] = useState(null);

  const exportConfig = () => {
    const config = { widgets, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboard-config.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importConfig = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result);
          if (config.widgets) {
            // Update localStorage and reload
            localStorage.setItem("widgets", JSON.stringify(config.widgets));
            window.location.reload();
          }
        } catch (err) {
          alert("Invalid config file");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div
      className={`min-h-screen w-full ${
        isDark
          ? "bg-gradient-to-br from-[#0b1220] to-[#0a182e] text-white"
          : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900"
      } p-8`}
    >
      {/* Top Navigation */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="px-2 py-1 bg-green-500/20 rounded-lg">📊</span>{" "}
            Finance Dashboard
          </h1>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Real-time widgets • API based
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="px-3 py-2 bg-blue-600 hover:bg-blue-500 transition rounded-lg font-medium shadow-lg text-sm"
            onClick={exportConfig}
          >
            Export
          </button>
          <label className="px-3 py-2 bg-blue-600 hover:bg-blue-500 transition rounded-lg font-medium shadow-lg text-sm cursor-pointer">
            Import
            <input
              type="file"
              accept=".json"
              onChange={importConfig}
              className="hidden"
            />
          </label>
          <ThemeToggle />
          <button
            className="px-4 py-2 bg-green-600 hover:bg-green-500 transition rounded-lg font-medium shadow-lg"
            onClick={() => dispatch(toggleModal(true))}
          >
            + Add Widget
          </button>
        </div>
      </header>

      {/* Widget Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgets.map((w) =>
          w.displayMode === "card" ? (
            <WidgetCard widget={w} key={w.id} onSettings={setSettingsWidget} />
          ) : w.displayMode === "table" ? (
            <WidgetTable widget={w} key={w.id} onSettings={setSettingsWidget} />
          ) : w.displayMode === "chart" ? (
            <WidgetChart widget={w} key={w.id} onSettings={setSettingsWidget} />
          ) : null
        )}

        {/* Add Widget Empty Box */}
        <div
          onClick={() => dispatch(toggleModal(true))}
          className={`border border-dashed hover:border-green-500/60 hover:bg-green-400/10 cursor-pointer rounded-xl py-10 flex flex-col items-center justify-center ${
            isDark
              ? "text-gray-300 border-green-500/30"
              : "text-gray-700 border-gray-400"
          }`}
        >
          <span className="text-4xl mb-2">+</span>
          <p className="font-medium">Add Widget</p>
          <p
            className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}
          >
            Connect to API & create custom widget
          </p>
        </div>
      </div>

      {modalOpen && <AddWidgetModal />}
      {settingsWidget && (
        <WidgetSettingsModal
          widget={settingsWidget}
          onClose={() => setSettingsWidget(null)}
        />
      )}
    </div>
  );
}
