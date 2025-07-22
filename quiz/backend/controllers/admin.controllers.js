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






// Offensive MCQs Data Storing through api
export const offensiveStore = async (req, res) => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        message: "Send a non-empty array of questions.",
      });
    }

    // Validate each question object
    const validQuestions = questions.filter(
      (q) =>
        q &&
        q.question &&
        q.difficulty &&
        q.answer &&
        Array.isArray(q.option) &&
        q.option.length === 4 &&
        q.option.includes(q.answer)
    );

    if (validQuestions.length === 0) {
      return res.status(400).json({
        message:
          "No valid questions. Each must include 'question', 'difficulty', 'answer', 4 options, and answer must match one of the options.",
      });
    }

    // Find existing questions to avoid duplicates
    const existingQuestions = await Offensive
      .find({ question: { $in: validQuestions.map((q) => q.question) } })
      .distinct("question");

    // Remove duplicates
    const newQuestions = validQuestions.filter(
      (q) => !existingQuestions.includes(q.question)
    );

    if (newQuestions.length === 0) {
      return res.status(200).json({
        message: "No new questions to insert. All are duplicates.",
      });
    }

    // Insert new questions (with difficulty included)
    await Offensive.insertMany(newQuestions, { ordered: false });

    return res.status(201).json({
      message: `${newQuestions.length} new questions inserted successfully.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error inserting questions.",
      error: error.message,
    });
  }
  
};




// Defensive MCQs Data Storing through api
export const defensiveStore = async (req, res) => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        message: "Send a non-empty array of questions.",
      });
    }

    // Validate each question object
    const validQuestions = questions.filter(
      (q) =>
        q &&
        q.question &&
        q.difficulty &&
        q.answer &&
        Array.isArray(q.option) &&
        q.option.length === 4 &&
        q.option.includes(q.answer)
    );

    if (validQuestions.length === 0) {
      return res.status(400).json({
        message:
          "No valid questions. Each must include 'question', 'difficulty', 'answer', 4 options, and answer must match one of the options.",
      });
    }

    // Find existing questions to avoid duplicates
    const existingQuestions = await defensive
      .find({ question: { $in: validQuestions.map((q) => q.question) } })
      .distinct("question");

    // Remove duplicates
    const newQuestions = validQuestions.filter(
      (q) => !existingQuestions.includes(q.question)
    );

    if (newQuestions.length === 0) {
      return res.status(200).json({
        message: "No new questions to insert. All are duplicates.",
      });
    }

    // Insert new questions (with difficulty included)
    await defensive.insertMany(newQuestions, { ordered: false });

    return res.status(201).json({
      message: `${newQuestions.length} new questions inserted successfully.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error inserting questions.",
      error: error.message,
    });
  }

};


// Malware MCQs Data Storing through api
export const malwaresStore = async (req, res) => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        message: "Send a non-empty array of questions.",
      });
    }

    // Validate each question object
    const validQuestions = questions.filter(
      (q) =>
        q &&
        q.question &&
        q.difficulty &&
        q.answer &&
        Array.isArray(q.option) &&
        q.option.length === 4 &&
        q.option.includes(q.answer)
    );

    if (validQuestions.length === 0) {
      return res.status(400).json({
        message:
          "No valid questions. Each must include 'question', 'difficulty', 'answer', 4 options, and answer must match one of the options.",
      });
    }

    // Find existing questions to avoid duplicates
    const existingQuestions = await malwares
      .find({ question: { $in: validQuestions.map((q) => q.question) } })
      .distinct("question");

    // Remove duplicates
    const newQuestions = validQuestions.filter(
      (q) => !existingQuestions.includes(q.question)
    );

    if (newQuestions.length === 0) {
      return res.status(200).json({
        message: "No new questions to insert. All are duplicates.",
      });
    }

    // Insert new questions (with difficulty included)
    await malwares.insertMany(newQuestions, { ordered: false });

    return res.status(201).json({
      message: `${newQuestions.length} new questions inserted successfully.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error inserting questions.",
      error: error.message,
    });
  }
};



// DevOps MCQs Data Storing through api
export const devOpsStore = async (req, res) => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        message: "Send a non-empty array of questions.",
      });
    }

    // Validate each question object
    const validQuestions = questions.filter(
      (q) =>
        q &&
        q.question &&
        q.difficulty &&
        q.answer &&
        Array.isArray(q.option) &&
        q.option.length === 4 &&
        q.option.includes(q.answer)
    );

    if (validQuestions.length === 0) {
      return res.status(400).json({
        message:
          "No valid questions. Each must include 'question', 'difficulty', 'answer', 4 options, and answer must match one of the options.",
      });
    }

    // Find existing questions to avoid duplicates
    const existingQuestions = await devOps
      .find({ question: { $in: validQuestions.map((q) => q.question) } })
      .distinct("question");

    // Remove duplicates
    const newQuestions = validQuestions.filter(
      (q) => !existingQuestions.includes(q.question)
    );

    if (newQuestions.length === 0) {
      return res.status(200).json({
        message: "No new questions to insert. All are duplicates.",
      });
    }

    // Insert new questions (with difficulty included)
    await devOps.insertMany(newQuestions, { ordered: false });

    return res.status(201).json({
      message: `${newQuestions.length} new questions inserted successfully.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error inserting questions.",
      error: error.message,
    });
  }
 
};





// Reverse Engineering MCQs Data Storing through api
export const reverseEngineerStore = async (req, res) => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        message: "Send a non-empty array of questions.",
      });
    }

    // Validate each question object
    const validQuestions = questions.filter(
      (q) =>
        q &&
        q.question &&
        q.difficulty &&
        q.answer &&
        Array.isArray(q.option) &&
        q.option.length === 4 &&
        q.option.includes(q.answer)
    );

    if (validQuestions.length === 0) {
      return res.status(400).json({
        message:
          "No valid questions. Each must include 'question', 'difficulty', 'answer', 4 options, and answer must match one of the options.",
      });
    }

    // Find existing questions to avoid duplicates
    const existingQuestions = await reverseEngineering
      .find({ question: { $in: validQuestions.map((q) => q.question) } })
      .distinct("question");

    // Remove duplicates
    const newQuestions = validQuestions.filter(
      (q) => !existingQuestions.includes(q.question)
    );

    if (newQuestions.length === 0) {
      return res.status(200).json({
        message: "No new questions to insert. All are duplicates.",
      });
    }

    // Insert new questions (with difficulty included)
    await reverseEngineering.insertMany(newQuestions, { ordered: false });

    return res.status(201).json({
      message: `${newQuestions.length} new questions inserted successfully.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error inserting questions.",
      error: error.message,
    });
  }
  
};