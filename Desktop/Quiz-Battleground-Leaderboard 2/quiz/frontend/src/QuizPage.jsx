import { useNavigate } from "react-router-dom";
import Card from "./Card";
import { useAuth } from "./Auth/AuthContext.jsx";

function QuizPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#74ebd5] via-[#acb6e5] to-[#ffffff] flex flex-col items-center px-4 py-12 pt-18 pb-21">
      {/* Event Box */}
      <div className="flex justify-center w-full mb-12">
        <div className="bg-purple-100 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform p-10 max-w-3xl w-full text-center">
          <h1 className="text-4xl font-bold text-blue-500 mb-6">Event</h1>
          <button
            onClick={() => navigate("/join-quiz")}
            className="bg-purple-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Join Quiz
          </button>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        <Card
          title="Reverse Engineering"
          imgSrc="../images/questionsIcon/reverse engineering.avif"
          desc="Create thought-provoking questions and craft your own quiz challenges for others to solve."
          button={
            <button
              onClick={() => navigate("/reverse-engineering")}
              className="bg-purple-500 hover:bg-red-600 text-white font-semibold py-2 px-6 mt-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Join Quiz
            </button>
          }
        />

        <Card
          title="Defensive"
          imgSrc="../images/questionsIcon/defensive.png"
          desc="Jump into the action—join a live quiz session and test your speed and knowledge."
          button={
            <button
              onClick={() => navigate("/defensive")}
              className="bg-purple-500 hover:bg-red-600 text-white font-semibold py-2 px-6 mt-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Join Quiz
            </button>
          }
        />

        <Card
          title="Offensive"
          imgSrc="../images/questionsIcon/ofensive.jpg"
          desc="Climb the leaderboard and celebrate your victory as a top trivia champion."
          button={
            <button
              onClick={() => navigate("/offensive")}
              className="bg-purple-500 hover:bg-red-600 text-white font-semibold py-2 px-6 mt-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Join Quiz
            </button>
          }
        />

        <Card
          title="DevOps"
          imgSrc="../images/questionsIcon/devOps.jpeg"
          desc="Climb the leaderboard and celebrate your victory as a top trivia champion."
          button={
            <button
              onClick={() => navigate("/devops")}
              className="bg-purple-500 hover:bg-red-600 text-white font-semibold py-2 px-6 mt-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Join Quiz
            </button>
          }
        />

        <Card
          title="Malware"
          imgSrc="../images/questionsIcon/malware.png"
          desc="Climb the leaderboard and celebrate your victory as a top trivia champion."
          button={
            <button
              onClick={() => navigate("/malware")}
              className="bg-purple-500 hover:bg-red-600 text-white font-semibold py-2 px-6 mt-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Join Quiz
            </button>
          }
        />
      </div>
    </div>
  );
}

export default QuizPage;
