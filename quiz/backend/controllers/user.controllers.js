// controllers/userController.js
import User from '../models/user.models.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(" Registering user:", { name, email });

    const newUser = await User.create({ name, email, password });

    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ message: ' Could not register user', error: error.message });
  }
};
