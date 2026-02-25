const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

/* SIGNUP */
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json("User already exists");

  const user = new User({ name, email, password });
  await user.save();

  res.json("Signup successful");
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.password !== password)
    return res.status(401).json("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    "SECRET_KEY"
  );

  res.json({ token, user });
});

module.exports = router;
