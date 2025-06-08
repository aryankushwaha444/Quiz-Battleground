import User from "../models/user.models.js";
import argon2 from "argon2";
import Categories from "../models/user.Result.models.js";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await argon2.hash(password);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User registered", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not register user", error: error.message });
  }
};


// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Only send safe fields
    return res.status(200).json({
      message: "Login successful",
      user: {
        name: user.username,
        email: user.email,
        profilePicture: user.profilePicture || null,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Store data user Result 

export const storeUserResult = async (req, res) =>{
  try {
    const result = new Categories(req.body);
    await result.save();
    res.status(201).json({ message: "Result stored" });
  }
  catch (error) {
    res.status(500).json({ message: "Error storing result", error: error.message });
  }
};


// fetch Store data user Result 

export const fetchUserResult = async (req, res) =>{
  try {
    const result = await UserResult.aggregate([
      { $match: { email } },
      {
          correct: { $sum: "$questions.correct" },
          score: { $sum: "$questions.score" },

      }
    ]);

    res.json(result[0]);
}
catch(error)
{
  console.error(error);
}
};
