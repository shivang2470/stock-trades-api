const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

dotenv.config();
const router = express.Router();

const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email, user_id: user.user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email, user_id: user.user_id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

router.post("/auth", async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ email, password: hashedPassword, user_id: uuidv4() });
      await user.save();
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });
    }
  
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
  
    user.refreshToken = refreshToken;
    await user.save();
  
    res.json({ accessToken, refreshToken });
});

module.exports = router;
