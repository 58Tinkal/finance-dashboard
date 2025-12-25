import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function useWidgetData(url, interval = 30) {
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(url);
      setData(res.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.log("API fetch failed:", err);
    }
  }, [url]);

  useEffect(() => {
    fetchData(); // initial fetch
    const timer = setInterval(fetchData, interval * 1000);
    return () => clearInterval(timer);
  }, [fetchData, interval]);

  return [data, fetchData, lastUpdated];
}
