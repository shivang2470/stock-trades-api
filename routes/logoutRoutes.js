const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/logout", async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.sendStatus(204);

  await User.updateOne({ refreshToken }, { $unset: { refreshToken: 1 } });
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
});

module.exports = router;
