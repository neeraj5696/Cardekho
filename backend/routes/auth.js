// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

const router = express.Router();
const jwtSecret = crypto.randomBytes(64).toString("hex");

// Secret key for JWT
const JWT_SECRET = process.env.jwtSecret;

// MongoDB client
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://neerajkumar5696:a8QOGFvjlD9T3F7y@cluster0.sw64i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { tlsInsecure: false });
const dbName = "carDatabase";  // Use your database name

// Middleware to connect to the database
const connectDB = async (req, res, next) => {
  try {
    await client.connect();
    req.db = client.db(dbName);
    req.usersCollection = req.db.collection("users");
    next();
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ error: "Failed to connect to the database" });
  }
};

router.use(connectDB);

// Register route
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await req.usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const result = await req.usersCollection.insertOne({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await req.usersCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create and send a JWT token
    const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, userId: user._id });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ error: "Failed to log in user" });
  }
});

module.exports = router;
