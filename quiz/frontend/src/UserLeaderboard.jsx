import { useEffect, useState } from "react";
import { useAuth } from "./Auth/AuthContext.jsx";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Leaderboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [currentUserStats, setCurrentUserStats] = useState(null);

  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: "Alice",
        email: "alice@mail.com",
        points: 980,
        wins: 34,
        score: 231,
        correct: 23,
        avatar: "/avatars/alice.png",
      },
      {
        id: 2,
        name: "John Willis",
        email: "john@mail.com",
        points: 910,
        wins: 29,
        score: 198,
        correct: 19,
        avatar: "/avatars/john.png",
      },
      {
        id: 3,
        name: "Bob",
        email: "bob@mail.com",
        points: 600,
        wins: 12,
        score: 140,
        correct: 10,
        avatar: "/avatars/bob.png",
      },
      {
        id: 4,
        name: "You",
        email: user?.email || "you@mail.com",
        points: 780,
        wins: 40,
        score: 270,
        correct: 31,
        avatar: "/avatars/you.png",
      },
      {
        id: 5,
        name: "Ytr5ou",
        email: "ydfbou@mail.com",
        points: 7340,
        wins: 50,
        score: 330,
        correct: 28,
        avatar: "/avatars/you.png",
      },
      {
        id: 6,
        name: "Yofgbu",
        email: "ybfdh5ou@mail.com",
        points: 7380,
        wins: 44,
        score: 315,
        correct: 30,
        avatar: "/avatars/you.png",
      },
      {
        id: 7,
        name: "Yfgou",
        email: "ysffou@mail.com",
        points: 753,
        wins: 19,
        score: 150,
        correct: 12,
        avatar: "/avatars/you.png",
      },
      {
        id: 8,
        name: "Yfgou",
        email: "y3hnfdou@mail.com",
        points: 280,
        wins: 5,
        score: 85,
        correct: 4,
        avatar: "/avatars/you.png",
      },
      {
        id: 9,
        name: "Yofgu",
        email: "yobsdg45u@mail.com",
        points: 480,
        wins: 9,
        score: 105,
        correct: 7,
        avatar: "/avatars/you.png",
      },
    ];

    const sorted = [...mockUsers].sort((a, b) => b.points - a.points);
    setUsers(sorted);

    const current = sorted.find(
      (u) => u.email === (user?.email || "you@mail.com")
    );
    setCurrentUserStats(current);
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-600 p-6 space-y-10">
      
      {/* 👤 Top Profile Summary Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full mt-18 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 sticky top-4 z-20">
        <div className="w-full md:w-1/2 rounded-xl">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="User"
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
          ) : (
            <AccountCircleIcon
              className="text-gray-400 mx-auto mb-4"
              style={{ fontSize: 80 }}
            />
          )}
          <div className=" flex justify-items-center">
            <span>{user.name} </span>
          </div>
        </div>

        {currentUserStats && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span>🏆</span>
              <span className="font-semibold text-gray-700">
                Game Wins: {currentUserStats.wins}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔥</span>
              <span className="font-semibold text-gray-700">
                High Score: {currentUserStats.score}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>✅</span>
              <span className="font-semibold text-gray-700">
                Correct Answers: {currentUserStats.correct}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 🏅 Achievements & 🏆 Leaderboard */}
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-md p-6 flex-1 h-fit sticky top-36 z-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">
            🏅 Achievements
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <img
                src="/mnt/data/a5e92c29-5e10-453f-85cb-42bcf5ab68ad.png"
                alt="Comeback"
                className="w-16 h-16"
              />
              <span className="text-sm mt-2">Comeback</span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/mnt/data/a5e92c29-5e10-453f-85cb-42bcf5ab68ad.png"
                alt="Lucky"
                className="w-16 h-16"
              />
              <span className="text-sm mt-2">Lucky</span>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-purple-100 rounded-2xl shadow-2xl p-6 flex-1 h-96 overflow-y-auto">
          <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
            Participate User's Details
          </h1>
          <div className="grid gap-6">
            {users.map((u, index) => {
              const isCurrentUser = u.email === (user?.email || "you@mail.com");
              return (
                <div
                  key={u.id}
                  className={`flex items-center justify-between px-6 py-4 w-full rounded-2xl shadow-md border transition ${
                    isCurrentUser
                      ? "bg-yellow-100 border-yellow-400 ring-2 ring-yellow-500"
                      : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-gray-500 w-8 text-center">
                      #{index + 1}
                    </span>
                    <img
                      src={u.avatar}
                      alt={u.name}
                      className="w-12 h-12 rounded-full border-2 border-indigo-300"
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {u.name}
                      </p>
                      <p className="text-sm text-gray-500">{u.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-indigo-700">
                      {u.points} pts
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
