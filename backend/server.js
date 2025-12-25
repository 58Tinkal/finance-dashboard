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

app.get("/", (req,res)=>res.send("Backend running 🚀"));

app.listen(5000, () => console.log("Server running on port 5000"));
