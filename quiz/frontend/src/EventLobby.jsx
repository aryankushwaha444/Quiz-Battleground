import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "./Socket";
import { useAuth } from "./Auth/AuthContext";

function EventLobby() {
  const { joinID } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [allReady, setAllReady] = useState(false);
  const [waitingMessage, setWaitingMessage] = useState("");

  useEffect(() => {
    // Check if user is logged in
    if (!user?.name || !user?.email) {
      alert("You must be logged in to join the lobby.");
      navigate("/login");
      return;
    }

    // Join the lobby
    socket.emit("join-room", { joinID, user: { name: user.name, email: user.email } });

    // Listen for room updates
    const handleRoomUpdate = (room) => {
      if (room?.users) {
        setUsers(room.users);
        // Check if all users are ready
        if (room.users.length >= 2 && room.users.length === room.readyUsers.length) {
          setAllReady(true);
          setWaitingMessage("");
        } else {
          setAllReady(false);
          if (!isReady) {
            setWaitingMessage("Click Ready when you are ready");
          } else {
            setWaitingMessage("Waiting for other players to Ready...");
          }
        }
      }
    };

    // Listen for quiz start
    const handleAllUsersReady = () => {
      window.location.href = "http://localhost:5173/malware"; // redirect all users
    };

    socket.on("room-update", handleRoomUpdate);
    socket.on("all-users-ready", handleAllUsersReady);

    // Cleanup on unmount
    return () => {
      socket.off("room-update", handleRoomUpdate);
      socket.off("all-users-ready", handleAllUsersReady);
    };
  }, [joinID, user, navigate, isReady]);

  const handleReady = () => {
    socket.emit("player-ready", { joinID, user: { name: user.name, email: user.email } });
    setIsReady(true);
  };

  const handleStart = () => {
    socket.emit("start-quiz", { joinID, user: { name: user.name, email: user.email } });
    // Server will emit "all-users-ready" to redirect all players
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
                <p className="mt-2 text-sm font-medium text-gray-800">{u.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {!isReady && (
            <button
              onClick={handleReady}
              className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Ready
            </button>
          )}

          {isReady && !allReady && (
            <p className="text-center text-gray-600">{waitingMessage}</p>
          )}

          {allReady && (
            <button
              onClick={handleStart}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Start Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventLobby;
