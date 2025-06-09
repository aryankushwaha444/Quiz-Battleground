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

export const storeUserResult = async (req, res) => {
  try {
    const result = new Categories(req.body);
    await result.save();
    res.status(201).json({ message: "Result stored" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error storing result", error: error.message });
  }
};

// fetch Store data user Result

export const getLeaderboardStats = async (req, res) => {
  try {
    // Get all results from the database
    const results = await Categories.find();
    console.log("Found results:", results.length);

    // Group results by user and calculate stats
    const groupedResults = {};

    results.forEach((result) => {
      const { email, nameUser, questions } = result;

      if (!groupedResults[email]) {
        groupedResults[email] = {
          name: nameUser,
          email: email,
          correct: 0,
          score: 0,
          wins: 0,
          points: 0,
          totalQuestions: 0,
        };
      }

      // Calculate stats for this result
      const correct = questions.reduce(
        (sum, q) => sum + (q.correct ? 1 : 0),
        0
      );
      const score = questions.reduce((sum, q) => sum + q.score, 0);
      const wins = questions.reduce((sum, q) => sum + (q.winner ? 1 : 0), 0);

      // Update user's stats
      groupedResults[email].correct += correct;
      groupedResults[email].score += score;
      groupedResults[email].wins += wins;
      groupedResults[email].points += correct * 2 + score + wins * 5;
      groupedResults[email].totalQuestions += questions.length;
    });

    // Convert to array and sort by points
    const leaderboard = Object.values(groupedResults)
      .sort((a, b) => b.points - a.points)
      .map((user) => ({
        ...user,
        rank: (user.correct / user.totalQuestions) * 100,
      }));

    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res
      .status(500)
      .json({ message: "Error fetching leaderboard", error: error.message });
  }
};
