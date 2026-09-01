import argon2 from "argon2";
import ResultCategory from "../models/user.Result.models.js"; // unified name
import EventResult from "../models/user.Event.Result.models.js";
import Malwares from "../models/malware.models.js";
import Defensive from "../models/defensive.models.js";
import Offensive from "../models/offensive.models.js";
import DevOps from "../models/devOps.models.js";
import ReverseEngineering from "../models/reverseEngineering.models.js";
import EventQuiz from "../models/eventQuiz.model.js";
import User from "../models/user.models.js";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email, and password are required.",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email or username.",
      });
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = await User.create({
      username: username.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ message: "invalid email or password" });

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch)
      return res.status(401).json({ message: "invalid email or password" });

    return res.status(200).json({
      message: "Login successful",
      user: {
        name: user.username,
        email: user.email,
        profilePicture: user.profilePicture || null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const storeUserResult = async (req, res) => {
  try {
    const { email, nameCategory, questions, round } = req.body;

    if (!email || !nameCategory || !questions || questions.length === 0) {
      return res
        .status(400)
        .json({ message: "Missing required fields or no questions provided." });
    }

    let score = { easy: 0, medium: 0, hard: 0 };

    // Dynamically select the model based on the quiz category
    let QuestionModel;
    switch (nameCategory.toLowerCase()) {
      case "malware":
        QuestionModel = Malwares;
        break;
      case "devops":
        QuestionModel = DevOps;
        break;
      case "offensive":
        QuestionModel = Offensive;
        break;
      case "defensive":
        QuestionModel = Defensive;
        break;
      case "reverse engineering":
        QuestionModel = ReverseEngineering;
        break;
      case "event quiz":
        QuestionModel = EventQuiz;
        break;
      default:
        return res.status(400).json({ message: "Invalid category name" });
    }

    // Prevent duplicate submissions
    const existingResult = await ResultCategory.findOne({
      email,
      nameCategory,
    });
    if (existingResult) {
      return res.status(200).json({
        message: "Result already submitted",
        result: existingResult,
      });
    }

    // Evaluate questions
    const processedQuestions = await Promise.all(
      questions.map(async (q) => {
        const dbQuestion = await QuestionModel.findOne({
          question: q.question,
        });
        if (!dbQuestion) {
          return {
            question: q.question,
            answer: q.answer || null,
            correct: false,
            error: "Question not found in database",
          };
        }

        const isCorrect = q.answer === dbQuestion.answer;
        const difficulty = dbQuestion.difficulty?.toLowerCase() || "easy";

        if (isCorrect && score[difficulty] !== undefined) {
          score[difficulty]++;
        }

        return {
          question: dbQuestion.question,
          answer: q.answer || null,
          correct: isCorrect,
        };
      })
    );

    // Store result
    const result = await ResultCategory.create({
      email,
      nameCategory,
      round,
      score,
      questions: processedQuestions,
      finishedAt: new Date(),
    });

    res.status(200).json({
      message: "User result saved successfully",
      result,
    });
  } catch (error) {
    console.error("❌ Error saving user result:", error);
    res.status(500).json({ message: "Failed to save user result" });
  }
};

// Leaderboard Calculation
export const getLeaderboardStats = async (req, res) => {
  try {
    const results = await ResultCategory.find();
    const eventResults = await EventResult.find();

    const groupedResults = {};

    // Category-based results
    results.forEach(({ email, score, questions }) => {
      if (!groupedResults[email]) {
        groupedResults[email] = {
          email,
          correct: 0,
          totalQuestions: 0,
          score: 0,
          wins: 0,
          points: 0,
        };
      }

      const correct = questions.reduce(
        (sum, q) => sum + (q.correct ? 1 : 0),
        0
      );
      const totalQuestions = questions.length;
      const categoryScore =
        (score.easy || 0) * 1 + (score.medium || 0) * 2 + (score.hard || 0) * 3;

      groupedResults[email].correct += correct;
      groupedResults[email].totalQuestions += totalQuestions;
      groupedResults[email].score += categoryScore;
    });

    // Event-based results
    eventResults.forEach(({ email, score, questions }) => {
      if (!groupedResults[email]) {
        groupedResults[email] = {
          email,
          correct: 0,
          totalQuestions: 0,
          score: 0,
          wins: 0,
          points: 0,
        };
      }

      const correct = questions.reduce(
        (sum, q) => sum + (q.correct ? 1 : 0),
        0
      );
      const totalQuestions = questions.length;
      const eventScore =
        (score.easy || 0) * 1 + (score.medium || 0) * 2 + (score.hard || 0) * 3;

      groupedResults[email].correct += correct;
      groupedResults[email].totalQuestions += totalQuestions;
      groupedResults[email].score += eventScore;
    });

    // Final Points (only difficulty weights)
    Object.values(groupedResults).forEach((user) => {
      user.points = user.score;
    });

    const leaderboard = Object.values(groupedResults)
      .sort((a, b) => b.points - a.points)
      .map((user) => ({
        ...user,
        accuracy: user.totalQuestions
          ? ((user.correct / user.totalQuestions) * 100).toFixed(2)
          : "0.00",
      }));

    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res
      .status(500)
      .json({ message: "Error fetching leaderboard", error: error.message });
  }
};

// Check if Quiz Played
export const checkPlayed = async (req, res) => {
  const { email, category } = req.body;
  try {
    const existing = await ResultCategory.findOne({
      email,
      nameCategory: category,
    });
    res.json({ played: !!existing });
  } catch (error) {
    res.status(500).json({ played: false });
  }
};

// Fetching All Questions by Category
export const malwareFetch = async (req, res) => {
  try {
    const data = await Malwares.find();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch Malware questions" });
  }
};

export const defensiveFetch = async (req, res) => {
  try {
    const data = await Defensive.find();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch Defensive questions" });
  }
};

export const offensiveFetch = async (req, res) => {
  try {
    const data = await Offensive.find();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch Offensive questions" });
  }
};

export const devOpsFetch = async (req, res) => {
  try {
    const data = await DevOps.find();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch DevOps questions" });
  }
};

export const reverseEngineerFetch = async (req, res) => {
  try {
    const data = await ReverseEngineering.find();
    res.json(data);
  } catch {
    res
      .status(500)
      .json({ error: "Failed to fetch Reverse Engineering questions" });
  }
};

export const eventQuizFetch = async (req, res) => {
  try {
    const data = await EventQuiz.find();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch DevOps questions" });
  }
};
