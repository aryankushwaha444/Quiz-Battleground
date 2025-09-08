import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./Auth/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import fisherYatesShuffle from "./fisherYatesShuffle";
import socket from "./Socket";

function EventQuiz() {
  const { joinID } = useParams(); // room ID from route
  const { user } = useAuth();
  const navigate = useNavigate();

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
  const [leaderboard, setLeaderboard] = useState({});

  // Prevent copy, right-click, and F12
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && ["c", "x", "a"].includes(e.key.toLowerCase())) ||
        e.key === "F12"
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Prevent refresh and back navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "F5" || (e.ctrlKey && e.key.toLowerCase() === "r"))
        e.preventDefault();
      if (
        e.key === "Backspace" &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
      )
        e.preventDefault();
    };
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handlePopState);
    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Ensure user is authenticated
  useEffect(() => {
    if (!user?.email) navigate("/login");
  }, [user, navigate]);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("/api/user/eventquiz");
        const shuffled = fisherYatesShuffle(
          res.data.map((q) => ({ ...q, correctAnswer: q.answer }))
        );
        setAllQuestions(shuffled);
        const easyQs = shuffled.filter((q) => q.difficulty === "easy");
        setQuestions(easyQs.slice(0, 5));
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

  // Listen for leaderboard updates
  useEffect(() => {
    const handleScore = (allScores) => {
      console.log("Received leaderboard:", allScores);
      setLeaderboard({ ...allScores });
    };

    socket.on("score-broadcast", handleScore);

    return () => {
      socket.off("score-broadcast", handleScore);
    };
  }, []);

  // Unified answer handler (replaces direct score calculation inside handleSubmit)
  const handleAnswer = (difficulty, isCorrect) => {
    const updatedScore = { ...score };
    if (isCorrect) updatedScore[difficulty] += 1;
    setScore(updatedScore);
    // console.log("Emitting score-update", joinID, user, updatedScore);

    // Emit to backend
    socket.emit("score-update", {
      joinID,
      user: { name: user.name, email: user.email },
      score: updatedScore,
    });
  };

  const handleSubmit = () => {
    const current = questions[currentIndex];
    const isCorrect = selectedOption === current.correctAnswer;

    // use handleAnswer instead of direct score updates
    handleAnswer(current.difficulty, isCorrect);

    setAnswers((prev) => [
      ...prev,
      {
        question: current.question,
        answer: selectedOption || null,
        correctAnswer: current.correctAnswer,
        correct: isCorrect,
      },
    ]);

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedOption("");
      setTimeLeft(10);
      setCurrentIndex((prev) => prev + 1);
    }, 1000);
  };

  // Handle rounds and next questions
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
        submitFinalResult();
      }
    }
  }, [currentIndex, round, score, allQuestions]);

  const submitFinalResult = () => {
    if (!user?.email || !answers.length) return;
    const userResult = {
      email: user.email,
      nameCategory: "Event Quiz",
      round,
      questions: answers,
    };
    axios
      .post("/api/user/playing-quiz", userResult)
      .then(() => setQuizEnded(true))
      .catch((err) => console.error(err));
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
            <p className="font-bold mt-2">
              Total Points: {score.easy * 1 + score.medium * 2 + score.hard * 3}
            </p>
          </div>

          {/* Leaderboard */}
          <div className="text-left mt-6">
            <h3 className="font-bold mb-2">Leaderboard:</h3>

            {Object.entries(leaderboard)
              .map(([email, s]) => ({
                email,
                easy: s.easy,
                medium: s.medium,
                hard: s.hard,
                total: s.easy * 1 + s.medium * 2 + s.hard * 3,
              }))
              .sort((a, b) => b.total - a.total)
              .map((player, index) => (
                <div
                  key={player.email}
                  className={`flex justify-between items-center p-2 rounded-lg mb-1 ${
                    index === 0
                      ? "bg-yellow-200 font-bold shadow-md"
                      : "bg-gray-100"
                  }`}
                >
                  <span className="text-sm">{player.email}</span>
                  <span className="text-sm font-semibold">
                    {player.total} pts
                    <span className="ml-2 text-xs text-gray-500">
                      (E:{player.easy} M:{player.medium} H:{player.hard})
                    </span>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentIndex >= questions.length && !quizEnded)
    return <div>Preparing next round...</div>;

  const current = questions[currentIndex];
  // console.log("Leaderboard state:", leaderboard);

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
            {current.difficulty.charAt(0).toUpperCase() +
              current.difficulty.slice(1)}
          </span>
        </div>

        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <span className="bg-purple-200 text-purple-800 text-sm font-bold px-4 py-1 rounded-full shadow-md">
            Round {round}
          </span>
          <span className="text-2xl text-red-600">⏳</span>
          <span className="text-lg font-bold text-red-600">{timeLeft}s</span>
        </div>

        <QuestionCard
          question={current.question}
          option={current.option}
          selectedOption={selectedOption}
          onSelectOption={setSelectedOption}
          disabled={submitted}
        />

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

        {/* Live leaderboard */}
        <div className="mt-6 text-left">
          <h3 className="font-bold mb-2">Leaderboard:</h3>

          {Object.entries(leaderboard)
            // convert object into array with calculated total score
            .map(([email, s]) => ({
              email,
              easy: s.easy,
              medium: s.medium,
              hard: s.hard,
              total: s.easy * 1 + s.medium * 2 + s.hard * 3, // points system
            }))
            // sort by total score descending
            .sort((a, b) => b.total - a.total)
            // render leaderboard
            .map((player, index) => (
              <div
                key={player.email}
                className={`flex justify-between items-center p-2 rounded-lg mb-1 ${
                  index === 0
                    ? "bg-yellow-200 font-bold shadow-md" // highlight top scorer
                    : "bg-gray-100"
                }`}
              >
                <span className="text-sm">{player.email}</span>
                <span className="text-sm font-semibold">
                  {player.total} pts
                  <span className="ml-2 text-xs text-gray-500">
                    (E:{player.easy} M:{player.medium} H:{player.hard})
                  </span>
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default EventQuiz;
