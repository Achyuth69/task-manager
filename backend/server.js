// server.js
require("dotenv").config(); // Load .env variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// ✅ Use environment port or fallback to 6969
const PORT = process.env.PORT || 6969;

// ✅ Middleware
app.use(express.json());

// ✅ CORS setup
app.use(
  cors({
    origin: "*", // later, replace '*' with your Netlify frontend URL for security
  })
);

// ✅ Routes
app.use("/api/tasks", taskRoutes);

// ✅ MongoDB connection
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern-task-manager";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// ✅ Root route (for Render health check or browser test)
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// ✅ Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
