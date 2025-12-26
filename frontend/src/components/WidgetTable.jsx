import { useDispatch } from "react-redux";
import { removeWidget } from "../features/widgets/widgetSlice";
import useWidgetData from "../utils/useWidgetData";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useMemo } from "react";
import { formatValue } from "../utils/formatValue";

export default function WidgetTable({ widget, onSettings }) {
  const dispatch = useDispatch();
  const [data, refresh, lastUpdated, loading, error] = useWidgetData(
    widget.url,
    widget.interval
  );
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Fixed to 10 rows per page
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  function extractRow(item, fields) {
    return fields.map((f) => {
      const value = f.split(".").reduce((acc, k) => acc?.[k], item);
      return formatValue(value, widget.fieldFormats?.[f] || "none");
    });
  }

  // Find the array data: if data is array, use it; else find first array value
  const tableData = useMemo(() => {
    let td = data;
    if (data && !Array.isArray(data)) {
      const keys = Object.keys(data);
      for (let key of keys) {
        if (Array.isArray(data[key])) {
          td = data[key];
          break;
        }
      }
    }
    return td || [];
  }, [data]);

  // Filter data based on search term and filters
  const filteredData = useMemo(() => {
    if (!Array.isArray(tableData)) return [];
    return tableData.filter((item) => {
      const rowValues = extractRow(item, widget.fields);
      // Check search
      const matchesSearch = rowValues.some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
      // Check filters
      const matchesFilters = widget.fields.every((field, idx) => {
        const filterValue = filters[field];
        if (!filterValue) return true;
        const value = String(rowValues[idx]);
        return value.toLowerCase().includes(filterValue.toLowerCase());
      });
      return matchesSearch && matchesFilters;
    });
  }, [tableData, searchTerm, filters, widget.fields]);

  // Pagination
  const totalPages = useMemo(
    () => Math.ceil(filteredData.length / pageSize),
    [filteredData.length, pageSize]
  );
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // Reset currentPage if it exceeds totalPages after filtering
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? 1 : 1);
    }
  }, [currentPage, totalPages]);

  // Reset to page 1 when modal opens
  useEffect(() => {
    if (modalOpen) {
      setCurrentPage(1);
    }
  }, [modalOpen]);

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
            className={`p-2 rounded hover:bg-gray-600/20 transition ${
              isDark
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
            title="Refresh"
          >
            🔄
          </button>
          <button
            className={`p-2 rounded hover:bg-gray-600/20 transition ${
              isDark
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
            title="Settings"
            onClick={() => onSettings(widget)}
          >
            ⚙️
          </button>
          <button
            onClick={() => dispatch(removeWidget(widget.id))}
            className={`p-2 rounded hover:bg-red-600/20 transition ${
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

      {/* Compact View */}
      <div className="text-center">
        <button
          onClick={() => setModalOpen(true)}
          className={`px-4 py-2 rounded-lg transition ${
            isDark
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          View Table
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className={`rounded-xl p-4 sm:p-6 shadow-2xl w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl max-h-[90vh] overflow-auto ${
              isDark ? "bg-[#112038]" : "bg-white"
            }`}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h3
                className={`text-lg font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {widget.name} - Full Table
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className={`p-2 rounded hover:bg-gray-600/20 transition ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                ✕
              </button>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div
                className={`p-4 rounded-lg border mb-4 ${
                  isDark
                    ? "bg-red-900/20 border-red-500/30 text-red-300"
                    : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                <p className="text-sm">Error loading data: {error}</p>
              </div>
            )}

            {/* No Data State */}
            {!data && !loading && !error && (
              <div
                className={`p-4 rounded-lg border mb-4 ${
                  isDark
                    ? "bg-gray-800/50 border-gray-600 text-gray-400"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                }`}
              >
                <p className="text-sm">No data available</p>
              </div>
            )}

            {data && !loading && !error && (
              <>
                {/* Search */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset to first page on search
                    }}
                    className={`w-full p-2 rounded border ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                {/* Filters */}
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {widget.fields.map((field) => (
                    <input
                      key={field}
                      type="text"
                      placeholder={`Filter ${field}`}
                      value={filters[field] || ""}
                      onChange={(e) => {
                        setFilters({ ...filters, [field]: e.target.value });
                        setCurrentPage(1); // Reset to first page on filter
                      }}
                      className={`p-2 rounded border ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center mb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded ${
                        currentPage === 1
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : isDark
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                      }`}
                    >
                      Prev
                    </button>
                    <span
                      className={`text-sm ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Page {currentPage} of {totalPages || 1}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage(
                          Math.min(totalPages || 1, currentPage + 1)
                        )
                      }
                      disabled={currentPage === totalPages || totalPages === 0}
                      className={`px-3 py-1 rounded ${
                        currentPage === totalPages
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : isDark
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-auto max-h-96 w-full">
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
                            className={`py-2 px-4 text-left ${
                              isDark ? "text-green-300" : "text-green-600"
                            }`}
                          >
                            {f}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((item, i) => (
                        <tr
                          key={i}
                          className={`border-b ${
                            isDark ? "border-gray-800" : "border-gray-200"
                          }`}
                        >
                          {extractRow(item, widget.fields).map((value, idx) => (
                            <td
                              key={idx}
                              className={`py-2 px-4 ${
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
