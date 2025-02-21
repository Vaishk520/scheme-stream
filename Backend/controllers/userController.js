// controllers/auth.js
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user");

const registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({ email, password: hashedPassword, role });
    await newUser.save();

    // Respond back
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser };
