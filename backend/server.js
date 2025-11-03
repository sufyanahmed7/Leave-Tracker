// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/db.js"; // your existing DB connector
import leaveRoutes from "./src/routes/leaveRoutes.js";

dotenv.config();
const app = express();

 app.use((req, res, next) => {
      const allowedOrigins = [
        'https://leave-tracker-8j0ex8cyb-haris-raees-projects.vercel.app',
        // Add any other specific origins that need access
      ];
      const origin = req.headers.origin;

      if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
      }
      
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Add any custom headers your frontend sends
      res.setHeader('Access-Control-Allow-Credentials', 'true'); // If you are sending cookies or authorization headers
      if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Handle preflight requests
      }
      next();
    });

app.use(express.json());

await connectDB(); // or call connectDB() depending on your implementation

app.use("/api/leaves", leaveRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
