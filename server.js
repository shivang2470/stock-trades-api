const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const refreshRoutes = require("./routes/refreshRoutes");
const logoutRoutes = require("./routes/logoutRoutes");
const tradeRoutes = require("./routes/tradeRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

connectDB();

app.use("/api", authRoutes);
app.use("/api", refreshRoutes);
app.use("/api", logoutRoutes);
app.use("/api/trades", tradeRoutes);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
module.exports = {app, server};