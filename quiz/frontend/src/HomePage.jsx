import { Create, Login, EmojiEvents } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-600 flex flex-col items-center pt-24 pb-10 ">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-500 animate-fade-in mt-4">
        Quiz Battleground
      </h1>
      <p className="text-black text-lg mb-12 animate-fade-in delay-200 text-center max-w-xl">
        Compete in real-time quiz battles with friends and challenge your knowledge
        <div>
        <button className="bg-purple-500 rounded-sm m-3 hover:bg-red-600 transform hover:scale-105 transition-transform " onClick={()=> navigate("/join-quiz")}><span>Play Quiz</span></button>

        </div>
      </p>
      

      <div className="grid grid-cols-1  mb-4 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
        {/* Create Quiz */}
        <Card
          title="Quiz Questioning"
          imgSrc="../images/homePage/quiz-question.gif"
          desc="Create thought-provoking questions and craft your own quiz challenges for others to solve."
          
        />

        {/* Join Quiz */}
        <Card
          title="Quiz Time"
          imgSrc = "../images/homePage/quiz-time.png"
          desc="Jump into the action—join a live quiz session and test your speed and knowledge"
        />

        {/* Leaderboard */}
        <Card
          title="Quiz Winner"
          imgSrc ="../images/homePage/quiz-winner.jpg"
          desc="Climb the leaderboard and celebrate your victory as a top trivia champion"
        
        />
      </div>
    </div>
  );
}


export default HomePage;
