import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "./QuestionCard";
import { useAuth } from "./Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import fisherYatesShuffle from "./fisherYatesShuffle";

function Defensive() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState({ easy: 0, medium: 0, hard: 0 });
  const [quizEnded, setQuizEnded] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Prevent copying, right-click and shortcut keys
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && ["c", "x", "a"].includes(e.key.toLowerCase())) ||
        e.key === "F12"
      ) {
        e.preventDefault();
        alert("Copying and inspecting are disabled during the quiz!");
      }
    };
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Prevent refresh & back navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "F5" || (e.ctrlKey && e.key.toLowerCase() === "r")) {
        e.preventDefault();
        alert("Refreshing is disabled during the quiz!");
      }
      if (
        e.key === "Backspace" &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
      ) {
        e.preventDefault();
        alert("Going back is disabled during the quiz!");
      }
    };
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
      alert("Going back is disabled!");
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handlePopState);
    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);



  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("/api/user/defensive");
        const shuffled = fisherYatesShuffle(
          res.data.map((q) => ({ ...q, correctAnswer: q.answer }))
        );
        setAllQuestions(shuffled);
        const easyQuestions = shuffled.filter((q) => q.difficulty === "easy");
        setQuestions(easyQuestions.slice(0, 5));
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, []);

  // Timer
  useEffect(() => {
    if (submitted || !questions.length || currentIndex >= questions.length)
      return;

    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, submitted, questions, currentIndex]);

  
  // Submit
  const handleSubmit = () => {
    const current = questions[currentIndex];
    const isCorrect = selectedOption === current.correctAnswer;

    setSubmitted(true);
    if (isCorrect) {
      setScore((prev) => ({
        ...prev,
        [current.difficulty]: prev[current.difficulty] + 1,
      }));
    }

    setAnswers((prev) => [
      ...prev,
      {
        question: current.question,
        answer: selectedOption || null,
        correctAnswer: current.correctAnswer,
        correct: isCorrect,
      },
    ]);

    setTimeout(() => {
      setSubmitted(false);
      setSelectedOption("");
      setTimeLeft(10);
      setCurrentIndex((prev) => prev + 1);
    }, 1000);
  };

  // Round 
  
  useEffect(() => {
    if (currentIndex === questions.length) {
      if (round === 1 && score.easy >= 4) {
        const mediumQs = allQuestions.filter((q) => q.difficulty === "medium");
        setQuestions(mediumQs);
        setCurrentIndex(0);
        setRound(2);
      } else if (round === 2 && score.medium >= 4) {
        const hardQs = allQuestions.filter((q) => q.difficulty === "hard");
        setQuestions(hardQs);
        setCurrentIndex(0);
        setRound(3);
      } else {
        setRound(round);
        submitFinalResult();
      }
    }
  }, [currentIndex, round, score, allQuestions]);

  const submitFinalResult = () => {
    const userResult = {
      nameUser: user.nameUser,
      email: user.email,
      nameCategory: "Defensive",
      round,
      score,
      questions: answers,
      finishedAt: new Date(),
    };

    axios
      .post("/api/user/playing-quiz", userResult)
      .then(() => {
        console.log("Results saved to MongoDB");
        setQuizEnded(true);
      })
      .catch((err) => console.error("Saving result failed:", err));
  };

  const resetQuiz = () => {
    const easyQuestions = allQuestions.filter((q) => q.difficulty === "easy");
    setQuestions(easyQuestions.slice(0, 5));
    setCurrentIndex(0);
    setSelectedOption("");
    setTimeLeft(10);
    setSubmitted(false);
    setAnswers([]);
    setRound(1);
    setScore({ easy: 0, medium: 0, hard: 0 });
    setQuizEnded(false);
  };

  if (quizEnded) {
    const totalCorrect = answers.filter((a) => a.correct).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#74ebd5] via-[#acb6e5] to-[#ffffff] flex items-center justify-center px-4">
        <div className="bg-purple-100 rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center">
          <h1 className="text-3xl font-bold text-green-800 mb-6">
            🎉 Quiz Completed!
          </h1>
          <p className="text-xl font-semibold text-gray-800 mb-2">
            ✅ Correct Answers: {totalCorrect}
          </p>
          <p className="text-lg text-purple-800 font-medium mb-4">
            🏆 Round : {round}
          </p>
          <div className="text-lg text-gray-700 mb-4">
            <p>Easy: {score.easy}</p>
            <p>Medium: {score.medium}</p>
            <p>Hard: {score.hard}</p>
          </div>
          <button
            onClick={resetQuiz}
            className="bg-purple-500 hover:bg-red-600 text-white font-semibold py-2 px-6 mt-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            🔄 Play Again
          </button>
        </div>
      </div>
    );
  }

  if (currentIndex >= questions.length && !quizEnded)
    return <div>Preparing next round...</div>;

  const current = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#74ebd5] via-[#acb6e5] to-[#ffffff] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-purple-100 p-8 rounded-2xl shadow-2xl relative select-none">
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              current.difficulty === "easy"
                ? "bg-green-200 text-green-800"
                : current.difficulty === "medium"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {current.difficulty.charAt(0).toUpperCase() + current.difficulty.slice(1)}
          </span>
        </div>

        <div className="absolute top-4 right-4 flex items-center space-x-2 animate-pulse">
          <span className="bg-purple-200 text-purple-800 text-sm font-bold px-4 py-1 rounded-full shadow-md animate-pulse">
            Round {round}
          </span>
          <span className="text-2xl text-red-600">⏳</span>
          <span className="text-lg font-bold text-red-600">{timeLeft}s</span>
        </div>

        <div className="select-none">
          <QuestionCard
            question={current.question}
            option={current.option}
            selectedOption={selectedOption}
            onSelectOption={setSelectedOption}
            disabled={submitted}
          />
        </div>

        {selectedOption && !submitted && (
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-green-600 text-white font-semibold py-2 rounded-full hover:bg-green-700 transition"
          >
            Submit
          </button>
        )}

        {submitted && (
          <p className="mt-4 text-center text-green-700 font-semibold">
            Answer Submitted!
          </p>
        )}
      </div>
    </div>
  );
}

export default Defensive;
