import { Create, Login, EmojiEvents } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-600 flex flex-col items-center pt-24 pb-10">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-500 mb-4 animate-fade-in">
        Quiz Battleground
      </h1>
      <p className="text-black text-lg mb-12 animate-fade-in delay-200 text-center max-w-xl">
        Compete in real-time quiz battles with friends and challenge your knowledge
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
        {/* Create Quiz */}
        <Card
          title="Create Quiz"
          icon={<Create className="text-blue-600" fontSize="large" />}
          desc="Design your own quiz with custom questions and invite others to compete"
          btnText="Create Now"
          btnColor="bg-blue-500 hover:bg-blue-600"
          onClick={() => navigate("/create-quiz")}
        />

        {/* Join Quiz */}
        <Card
          title="Join Quiz"
          icon={<Login className="text-pink-600" fontSize="large" />}
          desc="Enter a room code to join an existing quiz and compete with others"
          btnText="Join Now"
          btnColor="bg-pink-500 hover:bg-pink-600"
          onClick={() => navigate("/join-quiz")}
        />

        {/* Leaderboard */}
        <Card
          title="Leaderboard"
          icon={<EmojiEvents className="text-orange-600" fontSize="large" />}
          desc="View top performers and track your ranking in the quiz battles"
          btnText="View Rankings"
          btnColor="bg-orange-500 hover:bg-orange-600"
          onClick={() => navigate("/rank")}
        />
      </div>
    </div>
  );
}


export default HomePage;
