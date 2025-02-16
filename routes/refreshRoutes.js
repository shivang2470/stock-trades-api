const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();
const router = express.Router();

router.post("/refresh", async (req, res) => {
  let refreshToken = req.headers.authorization;
  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });
  refreshToken = refreshToken.split(" ")[1];
  const user = await User.findOne({ "refreshToken": refreshToken });

  if (!user) return res.status(403).json({ message: "Invalid refresh token" });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token expired or invalid" });
    console.log(user)
    const newAccessToken = jwt.sign({ email: user.email, user_id: user.user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
    res.json({ accessToken: newAccessToken });
  });
});

module.exports = router;
