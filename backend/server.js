const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { initializeDatabase } = require("./config/db");
const profileRoutes = require("./routes/profile");
const markerRoutes = require("./routes/markers");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Routes
app.get("/health", (_, res) => res.json({ status: "OK" }));
app.use("/profile", profileRoutes);
app.use("/markers", markerRoutes);

// Start
const startServer = async () => {
  await initializeDatabase();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();
