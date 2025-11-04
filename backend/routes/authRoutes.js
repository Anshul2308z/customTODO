import express from "express" ;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Register a new user
router.post("/register",async (req, res) => {
    const {username, password} = req.body; 

    const existingUser = await User.findOne({username});
    if (existingUser) {
        return res.status(400).json({message: "Username already exists"});
    };
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({username, password: hashedPassword});
    await newUser.save();

    res.status(201).json({message: "User registered successfully"});
});

// Login a user

router.post("/login", async (req, res) => {

    const {username, password} = req.body;

    const user = await User.findOne({username});

    if(!user) {
        return res.status(400).json({message: "User not found"}); 
    };

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        return res.status(400).json({message: "Invalid credentials"});
    };
    
    const token = jwt.sign({id: user._id, username: user.username}, JWT_SECRET, {expiresIn: "1h"});
    res.json({token}); 
}); 

export default router;