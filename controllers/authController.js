const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Assuming you have a User model

// Helper function for validation
const validateRegisterInput = (username, email, password) => {
  const errors = [];

  if (!username || typeof username !== "string" || username.trim() === "") {
    errors.push("Username is required and must be a non-empty string.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("A valid email is required.");
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }

  return errors;
};

// Register a new user
const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  const errors = validateRegisterInput(username, email, password);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({ error: "Invalid Input: Username or email already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = new User({ username, email, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: "User registered successfully" });
};

// Login a user
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || typeof email !== "string" || email.trim() === "") {
    return res.status(400).json({ error: "Email is required and must be a valid string." });
  }

  if (!password || typeof password !== "string" || password.trim() === "") {
    return res.status(400).json({ error: "Password is required and must be a valid string." });
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Invalid Credentials: Invalid email or password" });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid Credentials: Invalid email or password" });
  }

  // Generate JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
};

module.exports = { register, login };