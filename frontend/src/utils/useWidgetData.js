import { useEffect, useState } from "react";
import axios from "axios";

export default function useWidgetData(url, interval = 30) {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      console.log("API fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchData(); // initial fetch
    const timer = setInterval(fetchData, interval * 1000);
    return () => clearInterval(timer);
  }, [url, interval]);

  return data;
}
