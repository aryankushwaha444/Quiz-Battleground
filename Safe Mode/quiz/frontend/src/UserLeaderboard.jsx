import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./Auth/AuthContext.jsx";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Leaderboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [currentUserStats, setCurrentUserStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axios.get("/api/user/leaderboard");
        if (!Array.isArray(data)) {
          throw new Error("Unexpected response format");
        }
        setUsers(data);
        setCurrentUserStats(data.find((u) => u.email === user?.email) || null);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchLeaderboard();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#74ebd5] via-[#acb6e5] to-[#ffffff]">
        <p className="text-gray-600 text-lg">Loading user data...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#74ebd5] via-[#acb6e5] to-[#ffffff]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#74ebd5] via-[#acb6e5] to-[#ffffff]">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-10 bg-gradient-to-br from-[#74ebd5] via-[#acb6e5] to-[#ffffff]">
      {/* Current User Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mt-18 mx-auto flex items-center gap-6 sticky top-4 z-20">
        {user?.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="User"
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <AccountCircleIcon
            style={{ fontSize: 80 }}
            className="text-gray-400"
          />
        )}
        <div>
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
        {currentUserStats && (
          <div className="ml-auto flex flex-col gap-2">
            <div>🏆 Wins: {currentUserStats.wins}</div>
            <div>🔥 Score: {currentUserStats.score}</div>
            <div>✅ Correct: {currentUserStats.correct}</div>
          </div>
        )}
      </div>

      {/* Leaderboard List */}
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        <div className="bg-purple-100 rounded-2xl shadow-2xl mb-10 p-6 flex-1 h-96 overflow-y-auto">
          <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
            Participants
          </h1>
          {users.length === 0 ? (
            <p className="text-center text-gray-500">No participants yet.</p>
          ) : (
            <div className="grid gap-4">
              {users.map((u, index) => {
                const isCurrent = u.email === user?.email;
                return (
                  <div
                    key={u.email}
                    className={`flex items-center justify-between p-4 rounded-2xl shadow-md border ${
                      isCurrent
                        ? "bg-yellow-100 border-yellow-400 ring-2 ring-yellow-500"
                        : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xl">
                        {index === 0
                          ? "🥇"
                          : index === 1
                          ? "🥈"
                          : index === 2
                          ? "🥉"
                          : `#${index + 1}`}
                      </span>
                      {u.profilePicture ? (
                        <img
                          src={u.profilePicture}
                          alt={u.name || "Participant"}
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <AccountCircleIcon
                          style={{ fontSize: 48 }}
                          className="text-gray-400"
                        />
                      )}
                      <div>
                        <p className="font-semibold">{u.name}</p>
                        <p className="text-sm text-gray-500">{u.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-indigo-700">{u.points} pts</p>
                      <p className="text-sm">Score: {u.score}</p>
                      <p className="text-sm">Correct: {u.correct}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
