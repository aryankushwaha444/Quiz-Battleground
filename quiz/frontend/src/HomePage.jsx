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
    <div className="min-h-screen bg-background flex flex-col items-center pt-24 pb-10">
      <h1 className="text-5xl font-bold text-red-400 mb-4 animate-fade-in">
        Quiz Battleground
      </h1>

      <p className="text-gray-800 text-lg text-center max-w-xl mt-4 mb-8 animate-fade-in delay-200">
        Compete in real-time quiz battles with friends and challenge your
        knowledge.
      </p>

      <button
        onClick={handleAuthQueiz}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 mb-12"
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

        <div className="col-span-full w-full bg-white rounded-3xl shadow-2xl transform hover:scale-105 transition-transform p-10 mb-18 mt-18">
          <h1 className="text-4xl font-bold text-center text-primary mb-6">
            About QuizApp
          </h1>

          <p className="text-lg text-gray-700 mb-4">
            Welcome to{" "}
            <span className="text-red-500 font-semibold">QuizApp</span> – your
            fun and interactive platform to test your knowledge and challenge
            your friends!
          </p>

          <p className="text-lg text-gray-700 mb-4">
            Our mission is to provide a dynamic, engaging, and educational quiz
            experience for everyone. Whether you're preparing for exams,
            learning something new, or just looking to have fun, QuizApp is the
            perfect place for you.
          </p>

          <p className="text-lg text-gray-700 mb-4">We offer:</p>

          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li>Interactive quizzes across various topics</li>
            <li>Real-time leaderboard competition</li>
            <li>User-friendly interface and mobile responsiveness</li>
            <li>Regular content updates</li>
          </ul>

          <p className="text-lg text-gray-700 mt-6">
            Thank you for being part of the QuizApp community. Let's make
            learning fun together!
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
