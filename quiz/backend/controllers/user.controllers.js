import argon2 from "argon2";
import ResultCategory from "../models/user.Result.models.js"; // unified name
import EventResult from "../models/user.Event.Result.models.js";
import Malwares from "../models/malware.models.js";
import Defensive from "../models/defensive.models.js";
import Offensive from "../models/offensive.models.js";
import DevOps from "../models/devOps.models.js";
import ReverseEngineering from "../models/reverseEngineering.models.js";
import User from "../models/user.models.js";

// Register User
export const registerUser = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await argon2.hash(password);
        const newUser = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: "User registered", user: newUser });
    } catch (error) {
        res.status(500).json({
            message: "User already exists with this email or username.",
            error: error.message,
        });
    }
};

// Login User
export const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(401).json({ message: "Invalid email" });

        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) return res.status(401).json({ message: "Invalid password" });

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

// Store data for user result
export const storeUserResult = async(req, res) => {
    try {
        const { email, nameCategory, questions, round } = req.body;
        let score = { easy: 0, medium: 0, hard: 0 };

        const processedQuestions = await Promise.all(
            questions.map(async(q) => {
                const dbQuestion = await Malwares.findOne({ question: q.question });
                if (!dbQuestion) {
                    return {
                        question: q.question,
                        answer: q.answer || null,
                        correct: false,
                        score: 0,
                        error: "Question not found in DB",
                    };
                }

                const isCorrect = q.answer === dbQuestion.answer;
                const difficulty = dbQuestion.difficulty ? dbQuestion.difficulty.toLowerCase() : "easy";
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

        const result = await ResultCategory.findOneAndUpdate({ email, nameCategory }, {
            email,
            nameCategory,
            round:round,
            score,
            questions: processedQuestions,
            finishedAt: new Date(),
        }, { new: true, upsert: true, setDefaultsOnInsert: true });

        res.status(200).json({ message: "User result saved successfully", result });
    } catch (error) {
        console.error("Error saving user result:", error);
        res.status(500).json({ message: "Failed to save user result" });
    }
};



// Leaderboard Calculation
export const getLeaderboardStats = async(req, res) => {
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

            const correct = questions.reduce((sum, q) => sum + (q.correct ? 1 : 0), 0);
            const totalQuestions = questions.length;
            const categoryScore =
                (score.easy || 0) * 1 +
                (score.medium || 0) * 2 +
                (score.hard || 0) * 3;

            groupedResults[email].correct += correct;
            groupedResults[email].totalQuestions += totalQuestions;
            groupedResults[email].score += categoryScore;
        });

        // Event-based results
        eventResults.forEach(({ email, score, questions, wins }) => {
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

            const correct = questions.reduce((sum, q) => sum + (q.correct ? 1 : 0), 0);
            const totalQuestions = questions.length;
            const eventScore =
                (score.easy || 0) * 1 +
                (score.medium || 0) * 2 +
                (score.hard || 0) * 3;

            groupedResults[email].correct += correct;
            groupedResults[email].totalQuestions += totalQuestions;
            groupedResults[email].score += eventScore;
            groupedResults[email].wins += parseInt(wins) || 0;
        });

        // Final Points
        Object.values(groupedResults).forEach((user) => {
            user.points = user.correct * 2 + user.score + user.wins * 1;
        });

        const leaderboard = Object.values(groupedResults)
            .sort((a, b) => b.points - a.points)
            .map((user) => ({
                ...user,
                accuracy: user.totalQuestions ?
                    ((user.correct / user.totalQuestions) * 100).toFixed(2) : "0.00",
            }));

        res.json(leaderboard);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ message: "Error fetching leaderboard", error: error.message });
    }
};

// Check if Quiz Played
export const checkPlayed = async(req, res) => {
    const { email, category } = req.body;
    try {
        const existing = await ResultCategory.findOne({ email, nameCategory: category });
        res.json({ played: !!existing });
    } catch (error) {
        res.status(500).json({ played: false });
    }
};

// Fetching All Questions by Category
export const malwareFetch = async(req, res) => {
    try {
        const data = await Malwares.find();
        res.json(data);
    } catch {
        res.status(500).json({ error: "Failed to fetch Malware questions" });
    }
};

export const defensiveFetch = async(req, res) => {
    try {
        const data = await Defensive.find();
        res.json(data);
    } catch {
        res.status(500).json({ error: "Failed to fetch Defensive questions" });
    }
};

export const offensiveFetch = async(req, res) => {
    try {
        const data = await Offensive.find();
        res.json(data);
    } catch {
        res.status(500).json({ error: "Failed to fetch Offensive questions" });
    }
};

export const devOpsFetch = async(req, res) => {
    try {
        const data = await DevOps.find();
        res.json(data);
    } catch {
        res.status(500).json({ error: "Failed to fetch DevOps questions" });
    }
};

export const reverseEngineerFetch = async(req, res) => {
    try {
        const data = await ReverseEngineering.find();
        res.json(data);
    } catch {
        res.status(500).json({ error: "Failed to fetch Reverse Engineering questions" });
    }
};