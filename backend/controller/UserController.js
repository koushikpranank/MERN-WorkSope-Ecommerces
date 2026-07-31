const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../model/users");

// Fallback secret prevents the app from crashing if .env is missing
const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key_123";

const register = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();
    const trimmedPassword = password?.trim();

    if (!normalizedEmail || !trimmedPassword) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (await Users.findOne({ email: normalizedEmail })) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
    const newUser = await Users.create({
      ...rest,
      email: normalizedEmail,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase().trim();
    const password = req.body.password?.trim();

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const foundUser = await Users.findOne({ email });
    if (!foundUser)
      return res.status(401).json({ message: "Invalid credentials" });

    // Check password (with auto-upgrade for old unhashed passwords)
    let isPasswordValid = false;
    if (foundUser.password?.startsWith("$2")) {
      isPasswordValid = await bcrypt.compare(password, foundUser.password);
    } else if (password === foundUser.password) {
      isPasswordValid = true;
      foundUser.password = await bcrypt.hash(password, 10);
      await foundUser.save();
    }

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate Token using the correct secret key
    const token = jwt.sign(
      {
        id: foundUser._id,
        role: foundUser.role,
        username: foundUser.firstName,
      },
      JWT_SECRET,
      { expiresIn: "1h" }, // Changed from 10m to 1h for easier testing
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to login" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    if (!users.length)
      return res.status(404).json({ message: "No users found" });

    res.status(200).json({ users });
  } catch (e) {
    res.status(500).json({ message: "Failed to get users" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await Users.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "Invalid user ID" });

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (e) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

module.exports = { register, login, getAllUsers, deleteUser };
