import User from "../models/user.models.js";
import argon2 from "argon2";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name,email, password } = req.body;
    console.log("Registering user:", { name,email,password });

    const hashedPassword = await argon2.hash(password);

    const newUser = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "User registered", user: newUser });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ message: "Could not register user", error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Logging in user:", { email });

    const user = await User.findOne({ email});
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({ message: "Login successful" , user});
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
