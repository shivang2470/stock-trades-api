const express = require("express");
const Trade = require("../models/Trade");
const Counter = require("../models/Counter");
const User = require("../models/User");
const authenticateToken = require("../middleware/authMiddleware")

const router = express.Router();

const getNextSequence = async (name) => {
  const counter = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
};

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { type, symbol, shares, price } = req.body;
    const user_id = req.user.user_id;

    if (!type || !symbol || !shares || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!["buy", "sell"].includes(type)) {
      return res.status(400).json({ error: "Invalid trade type" });
    }

    if (shares < 1 || shares > 100) {
      return res.status(400).json({ error: "Shares must be between 1 and 100" });
    }

    const nextId = await getNextSequence("tradeId");

    const newTrade = new Trade({
      id: nextId,
      type,
      user_id,
      symbol,
      shares,
      price
    });

    await newTrade.save();
    res.status(201).json({"data": newTrade});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    const { type } = req.query;
    let filter = { user_id: req.user.user_id };

    if(type && type !== "all") filter.type = type;

    const trades = await Trade.find(filter).sort({ id: 1 });
    res.status(200).json({"data": trades});
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const trade = await Trade.findOne({ id: req.params.id, user_id: req.user.user_id });

    if (!trade) return res.status(404).json({ error: "Trade not found." });

    res.status(200).json({"data": trade});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
    try {
      const trade = await Trade.findOne({ id: req.params.id, user_id: req.user.user_id });
  
      if (!trade) return res.status(404).json({ error: "Trade not found." });
  
      res.status(200).json({"data": trade});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });

router.delete("/:id", (req, res) => res.status(405).json({ error: "Method not allowed." }));
router.put("/:id", (req, res) => res.status(405).json({ error: "Method not allowed." }));
router.patch("/:id", (req, res) => res.status(405).json({ error: "Method not allowed." }));

module.exports = router;
