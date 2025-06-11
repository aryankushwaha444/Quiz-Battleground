import Admin from "../models/admin.models.js";
import argon2 from "argon2";
import Offensive from "../models/offensive.models.js";
import malwares from "../models/malware.models.js";
import defensive from "../models/defensive.models.js";
import devOps from "../models/devOps.models.js";
import reverseEngineering from "../models/reverseEngineering.models.js";

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

    res
      .status(201)
      .json({ message: "Admin Registered Successfully", admin: adminData });
  } catch (err) {
    console.error("Error creating admin:", err.message);
    res
      .status(500)
      .json({ message: "Error creating admin", error: err.message });
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

    return res.status(200).json({ message: "Login successful", admin });
  } catch (error) {
    console.error("Login error:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Store data user Result
export const offensiveStore = async (req, res) => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions) || !questions.length) {
      return res
        .status(400)
        .json({ message: "Send a non-empty array of questions." });
    }

    // Filter only complete questions
    const validQuestions = questions.filter(
      (q) =>
        q.question &&
        q.answer &&
        q.option1 &&
        q.option2 &&
        q.option3 &&
        q.option4
    );

    // Fetch existing questions to prevent duplicates
    //
    const existing = await Offensive.find({
      question: { $in: validQuestions.map((q) => q.question) },
    }).distinct("question");

    const newQuestions = validQuestions.filter(
      (q) => !existing.includes(q.question)
    );

    if (!newQuestions.length) {
      return res.status(200).json({ message: "No new questions to insert." });
    }

    // Insert new questions
    //
    await Offensive.insertMany(newQuestions, { ordered: false });

    res
      .status(201)
      .json({ message: `${newQuestions.length} new questions inserted.` });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error inserting questions.", error: err.message });
  }
};

export const defensiveStore = async (req, res) => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions) || !questions.length) {
      return res
        .status(400)
        .json({ message: "Send a non-empty array of questions." });
    }

    // Filter only complete questions
    const validQuestions = questions.filter(
      (q) =>
        q.question &&
        q.answer &&
        q.option1 &&
        q.option2 &&
        q.option3 &&
        q.option4
    );

    // Fetch existing questions to prevent duplicates
    const existing = await defensive
      .find({
        question: { $in: validQuestions.map((q) => q.question) },
      })
      .distinct("question");

    const newQuestions = validQuestions.filter(
      (q) => !existing.includes(q.question)
    );

    if (!newQuestions.length) {
      return res.status(200).json({ message: "No new questions to insert." });
    }

    await defensive.insertMany(newQuestions, { ordered: false });

    res
      .status(201)
      .json({ message: `${newQuestions.length} new questions inserted.` });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error inserting questions.", error: err.message });
  }
};

// export const malwaresStore = async (req, res) => {
//   try {
//     const questions = req.body;

//     if (!Array.isArray(questions) || !questions.length) {
//       return res
//         .status(400)
//         .json({ message: "Send a non-empty array of questions." });
//     }

//     // Filter only complete questions
//     const validQuestions = questions.filter(
//       (q) =>
//         q.question &&
//         q.answer &&
//         q.option1 &&
//         q.option2 &&
//         q.option3 &&
//         q.option4
//     );

//     // Fetch existing questions to prevent duplicates
//     const existing = await malwares
//       .find({
//         question: { $in: validQuestions.map((q) => q.question) },
//       })
//       .distinct("question");

//     const newQuestions = validQuestions.filter(
//       (q) => !existing.includes(q.question)
//     );

//     if (!newQuestions.length) {
//       return res.status(200).json({ message: "No new questions to insert." });
//     }

//     await malwares.insertMany(newQuestions, { ordered: false });

//     res
//       .status(201)
//       .json({ message: `${newQuestions.length} new questions inserted.` });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error inserting questions.", error: err.message });
//   }
// };


export const malwaresStore = async (req, res) => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res
        .status(400)
        .json({ message: "Send a non-empty array of questions." });
    }

    // Validate and filter only complete questions
    const validQuestions = questions.filter(
      (q) =>
        q.question &&
        q.answer &&
        Array.isArray(q.option) &&
        q.option.length === 4 &&
        q.option.includes(q.answer) // answer must be one of the options
    );

    if (validQuestions.length === 0) {
      return res.status(400).json({
        message:
          "No valid questions. Ensure each question has 'question', 'answer', 4 options, and answer matches one option.",
      });
    }

    // Find existing questions by 'question' field
    const existingQuestions = await malwares
      .find({ question: { $in: validQuestions.map((q) => q.question) } })
      .distinct("question");

    // Filter out duplicates
    const newQuestions = validQuestions.filter(
      (q) => !existingQuestions.includes(q.question)
    );

    if (newQuestions.length === 0) {
      return res.status(200).json({ message: "No new questions to insert." });
    }

    await malwares.insertMany(newQuestions, { ordered: false });

    return res
      .status(201)
      .json({ message: `${newQuestions.length} new questions inserted.` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error inserting questions.", error: error.message });
  }
};




export const devOpsStore = async (req, res) => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions) || !questions.length) {
      return res
        .status(400)
        .json({ message: "Send a non-empty array of questions." });
    }

    // Filter only complete questions
    const validQuestions = questions.filter(
      (q) =>
        q.question &&
        q.answer &&
        q.option1 &&
        q.option2 &&
        q.option3 &&
        q.option4
    );

    // Fetch existing questions to prevent duplicates
    const existing = await devOps
      .find({
        question: { $in: validQuestions.map((q) => q.question) },
      })
      .distinct("question");

    const newQuestions = validQuestions.filter(
      (q) => !existing.includes(q.question)
    );

    if (!newQuestions.length) {
      return res.status(200).json({ message: "No new questions to insert." });
    }

    await devOps.insertMany(newQuestions, { ordered: false });

    res
      .status(201)
      .json({ message: `${newQuestions.length} new questions inserted.` });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error inserting questions.", error: err.message });
  }
};

export const reverseEngineerStore = async (req, res) => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions) || !questions.length) {
      return res
        .status(400)
        .json({ message: "Send a non-empty array of questions." });
    }

    // Filter only complete questions
    const validQuestions = questions.filter(
      (q) =>
        q.question &&
        q.answer &&
        q.option1 &&
        q.option2 &&
        q.option3 &&
        q.option4
    );

    // Fetch existing questions to prevent duplicates
    const existing = await reverseEngineering
      .find({
        question: { $in: validQuestions.map((q) => q.question) },
      })
      .distinct("question");

    const newQuestions = validQuestions.filter(
      (q) => !existing.includes(q.question)
    );

    if (!newQuestions.length) {
      return res.status(200).json({ message: "No new questions to insert." });
    }

    await reverseEngineering.insertMany(newQuestions, { ordered: false });

    res
      .status(201)
      .json({ message: `${newQuestions.length} new questions inserted.` });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error inserting questions.", error: err.message });
  }
};
