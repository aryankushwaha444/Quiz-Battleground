import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext.jsx";

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleAuthQuiz = () => {
    isAuthenticated ? navigate("/quiz") : navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#74ebd5] via-[#acb6e5] to-[#ffffff] flex flex-col">
      {/* Main Hero Banner */}
      <section className="w-full px-4 pt-24 pb-12">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            {/* Left Content */}
            <div className="p-8 sm:p-12 lg:p-16 text-center md:text-left">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-5">
                ⚡ Real-Time Quiz Battles
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Quiz
                <span className="text-yellow-300"> Battleground</span>
              </h1>

              <p className="text-white/90 text-base sm:text-lg lg:text-xl max-w-xl mt-5 mb-8">
                Test your knowledge, challenge your friends, and compete in
                real-time quiz battles.
              </p>

              <button
                onClick={handleAuthQuiz}
                className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-300 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                🎮 Play Quiz
              </button>
            </div>

            {/* Right Banner Image */}
            <div className="flex justify-center items-center md:p-8 lg:p-10">
              <img
                src="/images/quiz-battleground-banner.png"
                alt="Quiz Battleground"
                className="w-full max-w-xl h-auto object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
