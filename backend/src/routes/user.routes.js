const express = require('express');
const bcrypt = require('bcryptjs');
const User = require("../models/user.model");



const router = express.Router();


router.post("/SingUp", async (req, res) => {
    console.log(req.body)
    try {
        const {name, email, password} = req.body;

        const existingUser = await User.find({email})

        if(existingUser) {
            return res.status(400).json({
                message : "user already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email,
            password : hashedPassword
        })

        await newUser.save();
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "server error"
        })
    }
})


module.exports = router;
