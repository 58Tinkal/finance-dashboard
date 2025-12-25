import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleModal, addWidget } from "../features/widgets/widgetSlice";
import axios from "axios";
import { extractKeys } from "../utils/extractKeys";

export default function AddWidgetModal() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [interval, setInterval] = useState(30);

  const [apiData, setApiData] = useState(null);
  const [availableFields, setAvailableFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [displayMode, setDisplayMode] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const testAPI = async () => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      setApiData(res.data);
      setAvailableFields(extractKeys(res.data));
      setError("");
    } catch {
      setError("API request failed. Check URL.");
      setApiData(null);
      setAvailableFields([]);
    }
    setLoading(false);
  };

  const handleAddWidget = () => {
    dispatch(addWidget({
      id: Date.now(),
      name,
      url,
      interval,
      fields: selectedFields,
      displayMode,
    }));
    dispatch(toggleModal(false));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0f1a2e] w-[500px] p-6 rounded-xl shadow-xl border border-white/10">

        <h2 className="text-lg font-semibold mb-4">Add New Widget</h2>

        <label>Widget Name</label>
        <input className="input-field" value={name} onChange={(e)=>setName(e.target.value)}
               placeholder="Bitcoin Price Tracker"/>

        <label className="mt-3 block">API URL</label>
        <div className="flex gap-2">
          <input className="input-field" value={url} onChange={(e)=>setUrl(e.target.value)}/>
          <button className="btn-outline" onClick={testAPI}>{loading?"...":"Test"}</button>
        </div>

        <label className="mt-3 block">Refresh Interval (seconds)</label>
        <input type="number" className="input-field" value={interval} onChange={(e)=>setInterval(e.target.value)} />

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        {apiData && <p className="text-green-400 text-sm mt-2">✓ API connected successfully!</p>}

        {apiData && (
          <div className="mt-5">
            <p className="text-sm font-medium">Display Mode</p>
            <div className="flex gap-2 mt-2">
              {["card","table","chart"].map(type=>(
                <button key={type}
                  className={`px-3 py-1 rounded-md border text-sm 
                    ${displayMode===type?"bg-green-600":"border-gray-600"}`}
                  onClick={()=>setDisplayMode(type)}>
                  {type.toUpperCase()}
                </button>
              ))}
            </div>

            <p className="text-sm font-medium mt-4">Available Fields</p>
            <div className="h-32 overflow-y-auto border border-gray-700 rounded-md p-2 text-xs">
              {availableFields.map(f=>(
                <div key={f} className="flex justify-between items-center hover:bg-white/10 p-1 rounded">
                  <span>{f}</span>
                  <button className="text-green-400"
                    onClick={()=>!selectedFields.includes(f)&&setSelectedFields([...selectedFields,f])}>
                    +
                  </button>
                </div>
              ))}
            </div>

            <p className="text-sm font-medium mt-3">Selected Fields</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {selectedFields.map(f=>(
                <span key={f} className="bg-green-700 px-2 py-1 rounded text-xs flex gap-1 items-center">
                  {f}
                  <button onClick={()=>setSelectedFields(selectedFields.filter(s=>s!==f))}>×</button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button className="btn-outline" onClick={()=>dispatch(toggleModal(false))}>Cancel</button>
          <button className="btn-primary" onClick={handleAddWidget} disabled={!apiData}>Add Widget</button>
        </div>
      </div>
    </div>
  );
}
