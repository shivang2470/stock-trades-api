const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/logout", async (req, res) => {
  let refreshToken = req.headers.authorization;
  if (!refreshToken) return res.sendStatus(204);
  refreshToken = refreshToken.split(" ")[1];

  await User.updateOne({ refreshToken }, { $unset: { refreshToken: 1 } });
  res.json({ message: "Logged out" });
});

module.exports = router;
