import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "./QuestionCard";

function DevOps() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [timeLeft, setTimeLeft] = useState(3);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("/api/user/malware");
        const shuffled = res.data.sort(() => Math.random() - 0.5);
        setQuestions(shuffled);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (submitted || !questions.length) return;

    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, submitted, questions]);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedOption("");
      setTimeLeft(3);
      setCurrentIndex((prev) => prev + 1);
    }, 1000);
  };

  if (!questions.length) return <div>Loading...</div>;
  if (currentIndex >= questions.length)
    return (
      <div className="text-center font-bold text-xl">
        Quiz Completed!
      </div>
    );

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#74ebd5] via-[#acb6e5] to-[#ffffff] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-purple-100 p-8 rounded-2xl shadow-2xl relative">
        {/* Timer inside the container */}
        <div className="absolute top-4 right-4 flex items-center space-x-2 animate-pulse">
          <span className="text-2xl text-red-600">❤️</span>
          <span className="text-lg font-bold text-red-600">{timeLeft}s</span>
        </div>

        <QuestionCard
          question={currentQuestion.question}
          option={currentQuestion.option}
          selectedOption={selectedOption}
          onSelectOption={setSelectedOption}
          disabled={submitted}
        />

        {/* Next button inside container */}
        {selectedOption && !submitted && (
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-green-600 text-white font-semibold py-2 rounded-full hover:bg-green-700 transition"
          >
            Next
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

export default DevOps;
