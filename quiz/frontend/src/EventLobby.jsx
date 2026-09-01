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

  useEffect(() => {
    if (!user?.name || !user?.email) {
      alert("You must be logged in to join the lobby.");
      navigate("/login");
      return;
    }

    // -----------------------------
    // Room update handler
    // -----------------------------
    const handleRoomUpdate = (room) => {
      if (!room) return;

      if (room.users) {
        setUsers(room.users);
      }

      if (room.readyUsers) {
        // Check whether current user is ready
        const amIReady = room.readyUsers.some(
          (u) => u.email === user.email
        );

        setIsReady(amIReady);

        // -----------------------------------------
        // 2 or more players + EVERYONE is ready
        // -----------------------------------------
        if (
          room.users.length >= 2 &&
          room.users.length === room.readyUsers.length
        ) {
          console.log("All players are ready.");

          // React Router navigation
          navigate("/eventquiz");
        }
      }
    };

    // -----------------------------
    // Quiz started handler
    // -----------------------------
    const handleAllUsersReady = () => {
      console.log("Server says: all users are ready.");

      navigate("/eventquiz");
    };

    // IMPORTANT:
    // Register listeners BEFORE emitting join-room
    socket.on("room-update", handleRoomUpdate);
    socket.on("all-users-ready", handleAllUsersReady);

    // -----------------------------
    // Join lobby room
    // -----------------------------
    socket.emit("join-room", {
      joinID,
      user: {
        name: user.name,
        email: user.email,
      },
    });

    // -----------------------------
    // Cleanup
    // -----------------------------
    return () => {
      socket.off("room-update", handleRoomUpdate);
      socket.off("all-users-ready", handleAllUsersReady);
    };
  }, [joinID, user, navigate]);

  // -----------------------------
  // Ready button
  // -----------------------------
  const handleReady = () => {
    if (!user?.name || !user?.email) return;

    socket.emit("player-ready", {
      joinID,
      user: {
        name: user.name,
        email: user.email,
      },
    });

    setIsReady(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-xl">

        <h2 className="text-3xl font-bold text-center text-purple-600 mb-4">
          Event Lobby
        </h2>

        <p className="text-center text-gray-700 mb-6">
          Join ID:{" "}
          <span className="font-mono font-semibold">
            {joinID || "N/A"}
          </span>
        </p>

        {/* Players */}
        <div className="bg-gray-100 rounded-lg p-4 max-h-60 overflow-y-auto shadow-inner mb-6">

          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Players:
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

            {users.map((u, idx) => (
              <div
                key={u.email || idx}
                className="flex flex-col items-center"
              >
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

                {u.email === user?.email && (
                  <span className="text-xs text-green-600 font-semibold">
                    You
                  </span>
                )}
              </div>
            ))}

          </div>
        </div>

        {/* Ready status */}
        {!isReady ? (
          <button
            onClick={handleReady}
            disabled={users.length < 2}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              users.length < 2
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {users.length < 2
              ? "Waiting for Another Player..."
              : "Ready"}
          </button>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-semibold">
              ✓ You are Ready
            </p>

            <p className="text-gray-600 mt-2">
              Waiting for other players to be ready...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventLobby;
