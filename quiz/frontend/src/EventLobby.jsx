import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "./Socket";
import { useAuth } from "./Auth/AuthContext";

function EventLobby() {
  const { joinID } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user?.name || !user?.email) {
      alert("You must be logged in to join the lobby.");
      navigate("/login");
      return;
    }

    // Join room
    socket?.emit("join-room", {
      joinID,
      user: { name: user.name, email: user.email },
    });

    // Room update handler
    const handleRoomUpdate = (room) => {
      if (room?.users) {
        setUsers(room.users);
      }
    };

    // Register listeners
    socket?.on("room-update", handleRoomUpdate);
    socket?.on("all-users-ready", () => {
      navigate(`/eventquiz`);
    });

    // Cleanup
    return () => {
      socket?.off("room-update", handleRoomUpdate);
      socket?.off("all-users-ready");
    };
  }, [joinID, user, navigate]);

  const handleStart = () => {
    if (users.length >= 2) {
      socket?.emit("start-quiz", {
        joinID,
        user: { name: user.name, email: user.email },
      });
    } else {
      alert("At least 2 players are required to start the quiz.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-4">
          Event Lobby
        </h2>

        <p className="text-center text-gray-700 mb-6">
          Join ID: <span className="font-mono">{joinID || "N/A"}</span>
        </p>

        <div className="bg-gray-100 rounded-lg p-4 max-h-60 overflow-y-auto shadow-inner mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Players:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {users.map((u, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden shadow-md">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      u.name
                    )}&background=random&color=fff&size=64`}
                    alt={`${u.name}'s avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-800">
                  {u.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={users.length < 2}
          className={`w-full py-3 rounded-full text-white font-semibold transition ${
            users.length < 2
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {users.length < 2 ? "Waiting for Players..." : "Start Quiz"}
        </button>
      </div>
    </div>
  );
}

export default EventLobby;
