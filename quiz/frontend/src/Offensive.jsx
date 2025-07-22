import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "./QuestionCard";
import { useAuth } from "./Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import fisherYatesShuffle from "./fisherYatesShuffle";

function Offensive() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState({ easy: 0, medium: 0, hard: 0 });

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

  // Check if quiz already played
  useEffect(() => {
    const checkIfPlayed = async () => {
      try {
        const res = await axios.post("/api/user/checkedPlayed", {
          email: user.email,
          nameCategory: "Offensive",
        });
        // if (res.data.played) navigate("/malware-result");
      } catch (err) {
        console.error("Quiz check error:", err);
      }
    };
    if (user?.email) checkIfPlayed();
  }, [user, navigate]);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("/api/user/offensive");
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

  // Round logic
  useEffect(() => {
    if (currentIndex === questions.length) {
      if (round === 1 && score.easy >= 3) {
        const mediumQs = allQuestions.filter((q) => q.difficulty === "medium");
        setQuestions(mediumQs.slice(0, 4));
        setCurrentIndex(0);
        setRound(2);
      } else if (round === 2 && score.medium >= 2) {
        const hardQs = allQuestions.filter((q) => q.difficulty === "hard");
        setQuestions(hardQs.slice(0, 3));
        setCurrentIndex(0);
        setRound(3);
      } else {
        submitFinalResult();
      }
    }
  }, [currentIndex, round, score, allQuestions]);

  // Final result
  const submitFinalResult = () => {
    const userResult = {
      nameUser: user.nameUser,
      email: user.email,
      nameCategory: "Offensive",
      roundCleared: round,
      score,
      questions: answers,
      finishedAt: new Date(),
    };

    axios
      .post("/api/user/playing-quiz", userResult)
      .then(() => {
        console.log("Results saved to MongoDB");
        // navigate("/malware-result");
      })
      .catch((err) => console.error("Saving result failed:", err));
  };

  // Loading screen
  if (!questions.length) return <div>Loading Questions...</div>;
  if (currentIndex >= questions.length)
    return <div>Preparing next round...</div>;

  const current = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#74ebd5] via-[#acb6e5] to-[#ffffff] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-purple-100 p-8 rounded-2xl shadow-2xl relative select-none">
        {/* Difficulty badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold
              ${
                current.difficulty === "easy"
                  ? "bg-green-200 text-green-800"
                  : ""
              }
              ${
                current.difficulty === "medium"
                  ? "bg-yellow-200 text-yellow-800"
                  : ""
              }
              ${current.difficulty === "hard" ? "bg-red-200 text-red-800" : ""}
            `}
          >
            {current.difficulty.charAt(0).toUpperCase() +
              current.difficulty.slice(1)}
          </span>
        </div>

        {/* Timer */}
        <div className="absolute top-4 right-4 flex items-center space-x-2 animate-pulse">
          
          <span className="bg-purple-200 text-purple-800 text-sm font-bold px-4 py-1 rounded-full shadow-md animate-pulse">
            Round {round}
          </span>

          <span className="text-2xl text-red-600">⏳</span>
          <span className="text-lg font-bold text-red-600">{timeLeft}s</span>
        </div>

        {/* Prevent copying */}
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


export default Offensive;
