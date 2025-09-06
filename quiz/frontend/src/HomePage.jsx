import { useNavigate } from "react-router-dom";
import Card from "./Card";
import { useAuth } from "./Auth/AuthContext.jsx";

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleAuthQueiz = async () => {
    isAuthenticated ? navigate("/quiz") : navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#74ebd5] via-[#acb6e5] to-[#ffffff] flex flex-col items-center pt-24 pb-10">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-500 animate-fade-in">
        Quiz Battleground
      </h1>

      <p className="text-black text-lg text-center max-w-xl mt-4 mb-8 animate-fade-in delay-200">
        Compete in real-time quiz battles with friends and challenge your
        knowledge.
      </p>

      <button
        onClick={handleAuthQueiz}
        className="bg-purple-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 mb-12"
      >
        Play Quiz
      </button>

      <div className="bg-purple-100 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform p-10  mb-18 mt-18 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center text-blue-500 mb-6">
          About QuizApp
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          Welcome to <span className="text-red-500 font-semibold">QuizApp</span>{" "}
          – your fun and interactive platform to test your knowledge and
          challenge your friends!
        </p>

        <p className="text-lg text-gray-700 mb-4">
          Our mission is to provide a dynamic, engaging, and educational quiz
          experience for everyone. Whether you're preparing for exams, learning
          something new, or just looking to have fun, QuizApp is the perfect
          place for you.
        </p>

        <p className="text-lg text-gray-700 mb-4">We offer:</p>

        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
          <li>Interactive quizzes across various topics</li>
          <li>Real-time leaderboard competition</li>
          <li>User-friendly interface and mobile responsiveness</li>
          <li>Regular content updates</li>
        </ul>

        <p className="text-lg text-gray-700 mt-6">
          Thank you for being part of the QuizApp community. Let's make learning
          fun together!
        </p>
      </div>
    </div>
  );
}

export default HomePage;
