const express = require("express");
const protectRoute = require("../middlewares/auth.middleware")
const User = require("../models/user.model");

const router = express.Router();

router.get("/profile", protectRoute, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
