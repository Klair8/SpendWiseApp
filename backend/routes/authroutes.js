const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();    
require('dotenv').config();


//Register New User
router.post("/signup", async (req, res) => {

    try{
        const {username, email, password} = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //check if user already exist
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message: "User already exist"});
        }

        //HashPassword
        const salt = await bcrypt.genSalt(10);
        const HashPassword = await bcrypt.hash(password, salt);

        //save User
        const newUser = new User({
            username,
            email,
            password: HashPassword
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
}
);

// Login User
router.post("/login", async (req, res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        //generateToken
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

  
const verifyToken = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ message: "No token, authorization denied!" });
  
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid token!" });
    }
  };
  
  // Get user data (Protected Route)
  router.get("/user", verifyToken, async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  });
  
  module.exports = router;
  
