import { useNavigate } from "react-router-dom";
import Card from "./Card";
import { useAuth } from "./Auth/AuthContext.jsx";

function HomePage() {
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth();

  const handleAuthQueiz = async () =>
  {
    isAuthenticated ? navigate("/join-quiz") : navigate("/login");

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-600 flex flex-col items-center pt-24 pb-10">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-500 animate-fade-in">
        Quiz Battleground
      </h1>

      <p className="text-black text-lg text-center max-w-xl mt-4 mb-8 animate-fade-in delay-200">
        Compete in real-time quiz battles with friends and challenge your knowledge.
      </p>

      <button
        onClick={handleAuthQueiz}
        className="bg-purple-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 mb-12"
      >
        Play Quiz
      </button>

      <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mb-8 w-full max-w-6xl ">
        <Card
          title="Quiz Questioning"
          imgSrc="../images/homePage/quiz-question.gif"
          desc="Create thought-provoking questions and craft your own quiz challenges for others to solve."
        />
        <Card
          title="Quiz Time"
          imgSrc="../images/homePage/quiz-time.png"
          desc="Jump into the action—join a live quiz session and test your speed and knowledge."
        />
        <Card
          title="Quiz Winner"
          imgSrc="../images/homePage/quiz-winner.jpg"
          desc="Climb the leaderboard and celebrate your victory as a top trivia champion."
        />
      </div>
    </div>
  );
}

export default HomePage;
