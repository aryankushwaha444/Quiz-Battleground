import Admin from '../models/admin.models.js';
import argon2 from 'argon2';

// Register Admin
export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await argon2.hash(password);
    const adminData = await Admin.create({ email, password: hashedPassword });

    res.status(201).json({ message: "Admin Registered Successfully", admin: adminData });
  } catch (err) {
    console.error("Error creating admin:", err.message);
    res.status(500).json({ message: "Error creating admin", error: err.message });
  }
};

// Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Logging in admin:", { email });

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await argon2.verify(admin.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({ message: "Login successful", admin});
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
