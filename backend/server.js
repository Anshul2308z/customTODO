import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";


dotenv.config();

const app = express();

// Middleware 
app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// Routes 
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


// Start server 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

