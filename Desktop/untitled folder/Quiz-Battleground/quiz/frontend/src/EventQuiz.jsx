import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useAuth } from "./Auth/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import fisherYatesShuffle from "./fisherYatesShuffle";
import socket from "./Socket";



// Custom hook to block navigation
function useNavigationGuard(enabled) {
  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "Your quiz progress will be lost!";
    };

    const handleClick = (e) => {
      const anchor = e.target.closest("a");
      if (anchor && anchor.href) {
        e.preventDefault();
        alert("Navigation is disabled during the quiz! Your quiz cannot be stopped!");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleClick);
    };
  }, [enabled]);
}



function EventQuiz() {
  const { joinID } = useParams();
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
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState(""); // New

  const QUESTION_DURATION = { easy: 10, medium: 10, hard: 10 };

    // Block navigation while quiz is running
    useNavigationGuard(!quizEnded);


  // Prevent right-click & shortcuts
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && ["c", "x", "a"].includes(e.key.toLowerCase())) || e.key === "F12") {
        e.preventDefault();
        alert("Copying and inspecting are disabled!");
      }
    };
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);




    // Prevent back/refresh
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "F5" || (e.ctrlKey && e.key.toLowerCase() === "r")) {
          e.preventDefault();
          alert("Refreshing is disabled!");
        }
        if (e.key === "Backspace" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
          e.preventDefault();
          alert("Going back is disabled!");
        }
      };
      const handlePopState = () => {
        window.history.pushState(null, "", window.location.href);
        if (!quizEnded) alert("Going back is disabled!");
      };
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("popstate", handlePopState);
      window.history.pushState(null, "", window.location.href);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("popstate", handlePopState);
      };
    }, [quizEnded]);
  




  // Reset quiz if joinID changes
  useEffect(() => {
    const storedJoinID = localStorage.getItem("quiz_joinID");
    if (storedJoinID !== joinID) {
      clearQuizStorage();
      localStorage.setItem("quiz_joinID", joinID);
    }
  }, [joinID]);

  const clearQuizStorage = () => {
    [
      "event_score",
      "event_round",
      "event_currentIndex",
      "event_answers",
      "event_quizEnded",
      "event_questions",
      "event_allQuestions",
      "quiz_joinID",
    ].forEach((key) => localStorage.removeItem(key));

    for (let i = 0; i < 100; i++) {
      localStorage.removeItem(`event_questionStart_${i}`);
    }
  };

  // Join socket room
  useEffect(() => {
    if (user && joinID) socket.emit("join-room", { joinID, user });
  }, [user, joinID]);

  useEffect(() => {
    const handleConnect = () => {
      if (user && joinID) socket.emit("join-room", { joinID, user });
    };
    socket.on("connect", handleConnect);
    return () => socket.off("connect", handleConnect);
  }, [user, joinID]);

  // Initialize quiz
  useEffect(() => {
    const initializeQuiz = async () => {
      try {
        const savedAllQuestions = localStorage.getItem("event_allQuestions");
        const savedQuestions = localStorage.getItem("event_questions");
        const savedScore = localStorage.getItem("event_score");
        const savedRound = localStorage.getItem("event_round");
        const savedCurrentIndex = localStorage.getItem("event_currentIndex");
        const savedAnswers = localStorage.getItem("event_answers");
        const savedQuizEnded = localStorage.getItem("event_quizEnded");

        if (savedAllQuestions && savedQuestions) {
          setAllQuestions(JSON.parse(savedAllQuestions));
          setQuestions(JSON.parse(savedQuestions));
          if (savedScore) setScore(JSON.parse(savedScore));
          if (savedRound) setRound(Number(savedRound));
          if (savedCurrentIndex) setCurrentIndex(Number(savedCurrentIndex));
          if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
          if (savedQuizEnded) setQuizEnded(savedQuizEnded === "true");
        } else {
          const res = await axios.get("/api/user/eventquiz");
          const shuffled = fisherYatesShuffle(
            res.data.map((q) => ({ ...q, correctAnswer: q.answer }))
          );
          setAllQuestions(shuffled);
          setQuestions(shuffled.filter((q) => q.difficulty === "easy").slice(0, 5));
        }
      } catch (err) {
        console.error("Error initializing quiz:", err);
      } finally {
        setIsLoading(false);
      }
    };
    initializeQuiz();
  }, []);

  // Persist quiz state
  useEffect(() => { if (!isLoading) localStorage.setItem("event_score", JSON.stringify(score)); }, [score, isLoading]);
  useEffect(() => { if (!isLoading) localStorage.setItem("event_round", round.toString()); }, [round, isLoading]);
  useEffect(() => { if (!isLoading) localStorage.setItem("event_currentIndex", currentIndex.toString()); }, [currentIndex, isLoading]);
  useEffect(() => { if (!isLoading) localStorage.setItem("event_answers", JSON.stringify(answers)); }, [answers, isLoading]);
  useEffect(() => { if (!isLoading) localStorage.setItem("event_quizEnded", quizEnded.toString()); }, [quizEnded, isLoading]);
  useEffect(() => { if (!isLoading && questions.length) localStorage.setItem("event_questions", JSON.stringify(questions)); }, [questions, isLoading]);
  useEffect(() => { if (!isLoading && allQuestions.length) localStorage.setItem("event_allQuestions", JSON.stringify(allQuestions)); }, [allQuestions, isLoading]);

  // Leaderboard updates
  useEffect(() => {
    const handleScore = (scoresObj) => {
      setLeaderboard(scoresObj);
      if (user?.email && scoresObj[user.email]) {
        const s = scoresObj[user.email];
        setScore({ easy: s.easy || 0, medium: s.medium || 0, hard: s.hard || 0 });
      }
    };
    socket.on("score-broadcast", handleScore);
    return () => socket.off("score-broadcast", handleScore);
  }, [user]);

  // Timer per question
  useEffect(() => {
    if (!questions.length || currentIndex >= questions.length || submitted) return;
    const current = questions[currentIndex];
    const duration = QUESTION_DURATION[current.difficulty] || 10;

    if (!localStorage.getItem(`event_questionStart_${currentIndex}`)) {
      localStorage.setItem(`event_questionStart_${currentIndex}`, Date.now().toString());
    }

    const tick = () => {
      const startTime = Number(localStorage.getItem(`event_questionStart_${currentIndex}`));
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, duration - elapsed);
      setTimeLeft(remaining);

      if (remaining <= 0 && !submitted) handleSubmit();
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [questions, currentIndex, submitted]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Submit answer
  const handleSubmit = () => {
    const current = questions[currentIndex];
    if (!current) return;

    const isCorrect = selectedOption === current.correctAnswer;

    // Set feedback message
    if (isCorrect) setFeedbackMessage("✅ Correct!");
    else setFeedbackMessage(`❌ Wrong! Correct answer: ${current.correctAnswer}`);

    const updatedScore = { ...score };
    if (isCorrect) updatedScore[current.difficulty] += 1;
    setScore(updatedScore);

    socket.emit("score-update", { joinID, user: { name: user.name, email: user.email }, score: updatedScore });

    setAnswers((prev) => [
      ...prev,
      { question: current.question, answer: selectedOption || null, correctAnswer: current.correctAnswer, correct: isCorrect },
    ]);

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFeedbackMessage(""); // Clear feedback
      setSelectedOption("");
      setCurrentIndex((prev) => prev + 1);

      // Reset question start timestamp
      localStorage.setItem(`event_questionStart_${currentIndex + 1}`, Date.now().toString());
    }, 1500);

    localStorage.removeItem(`event_questionStart_${currentIndex}`);
  };

  // Handle rounds
  useEffect(() => {
    if (isLoading || currentIndex !== questions.length || !allQuestions.length) return;

    if (round === 1 && score.easy >= 4) {
      setQuestions(allQuestions.filter((q) => q.difficulty === "medium"));
      setCurrentIndex(0);
      setRound(2);
    } else if (round === 2 && score.medium >= 4) {
      setQuestions(allQuestions.filter((q) => q.difficulty === "hard"));
      setCurrentIndex(0);
      setRound(3);
    } else {
      submitFinalResult();
    }
  }, [currentIndex, round, score, allQuestions, isLoading]);

  const submitFinalResult = () => {
    if (!user?.email || !answers.length) return;

    axios.post("/api/user/playing-quiz", { email: user.email, nameCategory: "Event Quiz", round, questions: answers })
      .then(() => {
        setQuizEnded(true);
        localStorage.setItem("event_quizEnded", "true");
      }).catch(console.error);
  };

  const sortedLeaderboard = useMemo(() => {
    return Object.entries(leaderboard)
      .map(([email, s]) => ({
        email,
        easy: s.easy || 0,
        medium: s.medium || 0,
        hard: s.hard || 0,
        total: (s.easy || 0) * 1 + (s.medium || 0) * 2 + (s.hard || 0) * 3,
      }))
      .sort((a, b) => b.total - a.total);
  }, [leaderboard]);

  // --- UI ---
  if (isLoading) return <LoadingScreen message="Loading Quiz..." />;
  if (quizEnded) return <QuizEndScreen score={score} answers={answers} round={round} leaderboard={sortedLeaderboard} />;
  if (!questions.length) return <MessageScreen message="No questions available" />;
  if (currentIndex >= questions.length) return <MessageScreen message="Preparing next round..." />;

  const current = questions[currentIndex];
  if (!current) return <MessageScreen message="Question not found" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#74ebd5] via-[#acb6e5] to-[#ffffff] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-purple-100 p-8 rounded-2xl shadow-2xl relative select-none">
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${current.difficulty === "easy" ? "bg-green-200 text-green-800" : current.difficulty === "medium" ? "bg-yellow-200 text-yellow-800" : "bg-red-200 text-red-800"}`}>
            {current.difficulty.charAt(0).toUpperCase() + current.difficulty.slice(1)}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <span className="bg-purple-200 text-purple-800 text-sm font-bold px-4 py-1 rounded-full shadow-md">Round {round}</span>
          <span className="text-2xl text-red-600">⏳</span>
          <span className="text-lg font-bold text-red-600">{timeLeft}s</span>
        </div>

        <QuestionCard question={current.question} option={current.option} selectedOption={selectedOption} onSelectOption={setSelectedOption} disabled={submitted} />

        {selectedOption && !submitted && (
          <button onClick={handleSubmit} className="mt-6 w-full bg-green-600 text-white font-semibold py-2 rounded-full hover:bg-green-700 transition">
            Submit
          </button>
        )}

        {submitted && (
          <p className="mt-4 text-center font-semibold" style={{ color: feedbackMessage.startsWith("✅") ? "green" : "red" }}>
            {feedbackMessage}
          </p>
        )}

        <LeaderboardDisplay sortedLeaderboard={sortedLeaderboard} />
      </div>
    </div>
  );
}

// Helper components
const LoadingScreen = ({ message }) => <div className="min-h-screen flex items-center justify-center"><div className="text-center text-xl font-semibold text-purple-800">{message}</div></div>;
const MessageScreen = ({ message }) => <div className="min-h-screen flex items-center justify-center"><div className="text-center text-xl font-semibold text-red-600">{message}</div></div>;
const QuizEndScreen = ({ score, answers, round, leaderboard }) => {
  const totalCorrect = answers.filter(a => a.correct).length;
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-purple-100 rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Quiz Completed!</h1>
        <p className="text-xl font-semibold text-gray-800 mb-2">Correct Answers: {totalCorrect}</p>
        <p className="text-lg text-purple-800 font-medium mb-4">Round: {round}</p>
        <div className="text-lg text-gray-700 mb-4">
          <p>Easy: {score.easy}</p>
          <p>Medium: {score.medium}</p>
          <p>Hard: {score.hard}</p>
          <p className="font-bold mt-2">Total Points: {score.easy + score.medium * 2 + score.hard * 3}</p>
        </div>
        <LeaderboardDisplay sortedLeaderboard={leaderboard} />
      </div>
    </div>
  );
};

const LeaderboardDisplay = ({ sortedLeaderboard }) => (
  <div className="mt-6 text-left">
    <h3 className="font-bold mb-2">Leaderboard:</h3>
    {sortedLeaderboard.map((player, index) => (
      <div key={player.email} className={`flex justify-between items-center p-2 rounded-lg mb-1 ${index === 0 ? "bg-yellow-200 font-bold shadow-md" : "bg-gray-100"}`}>
        <span className="text-sm">{player.email}</span>
        <span className="text-sm font-semibold">{player.total} pts <span className="ml-2 text-xs text-gray-500">(E:{player.easy} M:{player.medium} H:{player.hard})</span></span>
      </div>
    ))}
  </div>
);

export default EventQuiz;
