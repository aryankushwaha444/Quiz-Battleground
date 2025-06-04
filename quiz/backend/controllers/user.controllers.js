import User from '../models/users.models.js';

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Creating user with:", { name, email, password });

    const newUser = await User.create({ name, email, password });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

export default userRegister;
