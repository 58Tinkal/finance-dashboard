import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import widgetRoutes from "./routes/widgetRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/widgets", widgetRoutes);

app.get("/api/test-data", (req, res) => {
  const sampleData = [
    { name: "Apple Inc.", symbol: "AAPL", price: 150.25, change: "+2.5%", volume: "45.2M" },
    { name: "Microsoft Corp.", symbol: "MSFT", price: 305.80, change: "+1.8%", volume: "32.1M" },
    { name: "Amazon.com Inc.", symbol: "AMZN", price: 3200.50, change: "-0.5%", volume: "28.7M" },
    { name: "Alphabet Inc.", symbol: "GOOGL", price: 2750.30, change: "+3.2%", volume: "22.4M" },
    { name: "Tesla Inc.", symbol: "TSLA", price: 850.75, change: "+5.1%", volume: "67.8M" },
    { name: "NVIDIA Corp.", symbol: "NVDA", price: 480.20, change: "+4.7%", volume: "38.9M" },
    { name: "Meta Platforms Inc.", symbol: "META", price: 330.45, change: "+1.2%", volume: "25.6M" },
    { name: "Netflix Inc.", symbol: "NFLX", price: 485.60, change: "-2.1%", volume: "15.3M" },
    { name: "Adobe Inc.", symbol: "ADBE", price: 560.90, change: "+0.8%", volume: "12.7M" },
    { name: "PayPal Holdings Inc.", symbol: "PYPL", price: 95.30, change: "-1.5%", volume: "18.4M" },
    { name: "Intel Corp.", symbol: "INTC", price: 35.20, change: "+2.0%", volume: "55.1M" },
    { name: "Cisco Systems Inc.", symbol: "CSCO", price: 48.75, change: "+1.3%", volume: "29.8M" },
    { name: "Qualcomm Inc.", symbol: "QCOM", price: 165.40, change: "+3.5%", volume: "21.6M" },
    { name: "AMD Inc.", symbol: "AMD", price: 120.85, change: "+4.2%", volume: "42.3M" },
    { name: "Zoom Video Communications", symbol: "ZM", price: 78.90, change: "-0.7%", volume: "8.9M" },
    { name: "Shopify Inc.", symbol: "SHOP", price: 85.60, change: "+2.8%", volume: "14.2M" },
    { name: "Square Inc.", symbol: "SQ", price: 145.25, change: "+1.9%", volume: "11.7M" },
    { name: "Spotify Technology S.A.", symbol: "SPOT", price: 320.15, change: "+0.5%", volume: "9.4M" },
    { name: "Twilio Inc.", symbol: "TWLO", price: 195.80, change: "+2.2%", volume: "7.6M" },
    { name: "DocuSign Inc.", symbol: "DOCU", price: 85.40, change: "-1.8%", volume: "6.3M" },
    { name: "Okta Inc.", symbol: "OKTA", price: 210.35, change: "+3.1%", volume: "5.8M" },
    { name: "CrowdStrike Holdings Inc.", symbol: "CRWD", price: 185.60, change: "+4.0%", volume: "4.9M" },
    { name: "Datadog Inc.", symbol: "DDOG", price: 125.75, change: "+2.7%", volume: "8.1M" },
    { name: "Atlassian Corp.", symbol: "TEAM", price: 245.90, change: "+1.6%", volume: "3.2M" },
    { name: "Snowflake Inc.", symbol: "SNOW", price: 180.50, change: "+3.8%", volume: "7.4M" }
  ];
  res.json(sampleData);
});

app.get("/api/test-chart-data", (req, res) => {
  const chartData = [
    { date: new Date("2024-01-01"), open: 150, high: 155, low: 148, close: 152, volume: 1000000 },
    { date: new Date("2024-01-02"), open: 152, high: 158, low: 150, close: 156, volume: 1200000 },
    { date: new Date("2024-01-03"), open: 156, high: 162, low: 154, close: 160, volume: 1100000 },
    { date: new Date("2024-01-04"), open: 160, high: 165, low: 158, close: 163, volume: 1300000 },
    { date: new Date("2024-01-05"), open: 163, high: 168, low: 160, close: 166, volume: 1400000 },
    { date: new Date("2024-01-08"), open: 166, high: 170, low: 163, close: 168, volume: 1150000 },
    { date: new Date("2024-01-09"), open: 168, high: 172, low: 165, close: 170, volume: 1250000 },
    { date: new Date("2024-01-10"), open: 170, high: 175, low: 168, close: 173, volume: 1350000 },
    { date: new Date("2024-01-11"), open: 173, high: 178, low: 170, close: 176, volume: 1450000 },
    { date: new Date("2024-01-12"), open: 176, high: 180, low: 174, close: 178, volume: 1200000 },
    { date: new Date("2024-01-15"), open: 178, high: 182, low: 175, close: 180, volume: 1300000 },
    { date: new Date("2024-01-16"), open: 180, high: 185, low: 178, close: 183, volume: 1400000 },
    { date: new Date("2024-01-17"), open: 183, high: 188, low: 180, close: 186, volume: 1500000 },
    { date: new Date("2024-01-18"), open: 186, high: 190, low: 183, close: 188, volume: 1250000 },
    { date: new Date("2024-01-19"), open: 188, high: 192, low: 185, close: 190, volume: 1350000 },
    { date: new Date("2024-01-22"), open: 190, high: 195, low: 188, close: 193, volume: 1450000 },
    { date: new Date("2024-01-23"), open: 193, high: 198, low: 190, close: 196, volume: 1550000 },
    { date: new Date("2024-01-24"), open: 196, high: 200, low: 193, close: 198, volume: 1300000 },
    { date: new Date("2024-01-25"), open: 198, high: 202, low: 195, close: 200, volume: 1400000 },
    { date: new Date("2024-01-26"), open: 200, high: 205, low: 198, close: 203, volume: 1500000 }
  ];
  res.json(chartData);
});

app.get("/", (req,res)=>res.send("Backend running 🚀"));

app.listen(5000, () => console.log("Server running on port 5000"));
