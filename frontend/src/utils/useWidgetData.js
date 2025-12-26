import { useEffect, useState, useCallback } from "react";
import axios from "axios";

// Simple cache with TTL
const cache = new Map();

function getCacheKey(url) {
  return btoa(url); // simple encoding
}

function getCachedData(url) {
  const key = getCacheKey(url);
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < 30000) { // 30s TTL
    return cached.data;
  }
  return null;
}

function setCachedData(url, data) {
  const key = getCacheKey(url);
  cache.set(key, { data, timestamp: Date.now() });
}

export default function useWidgetData(url, interval = 30) {
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (force = false) => {
    if (!url) return;

    const cached = getCachedData(url);
    if (!force && cached) {
      setData(cached);
      setLastUpdated(new Date());
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(url);
      setData(res.data);
      setCachedData(url, res.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.log("API fetch failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData(); // initial fetch
    const timer = setInterval(() => fetchData(), interval * 1000);
    return () => clearInterval(timer);
  }, [fetchData, interval]);

  return [data, fetchData, lastUpdated, loading, error];
}
