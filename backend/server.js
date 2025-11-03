// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/db.js"; // your existing DB connector
import leaveRoutes from "./src/routes/leaveRoutes.js";

dotenv.config();
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

await connectDB(); // or call connectDB() depending on your implementation

app.use("/api/leaves", leaveRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
