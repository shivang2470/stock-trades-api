const mongoose = require("mongoose");

const TradeSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  type: { type: String, required: true, enum: ["buy", "sell"] },
  user_id: { type: String, required: true },
  symbol: { type: String, required: true },
  shares: { type: Number, required: true, min: 1, max: 100 },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Trade = mongoose.model("Trade", TradeSchema);

module.exports = Trade;