const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const User = require("../models/user.model");



const router = express.Router();


router.post("/SignUp", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Incoming email:", email);

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log("Signup Error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});




router.post("/SignIn", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials for password",
      });
    }

    const token = jwt.sign(
      {id : user._id},
      process.env.JWT_SECRET,
      {expiresIn : "1d"}
    )


    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Signin Error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});



router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      path: "/", // VERY IMPORTANT
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log("Logout Error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});


module.exports = router;
