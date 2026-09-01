import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "./Socket";
import { useAuth } from "./Auth/AuthContext";

function EventLobby() {
  const { joinID } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [socketConnected, setSocketConnected] = useState(socket.connected);

  useEffect(() => {
    if (!user?.name || !user?.email) {
      alert("You must be logged in to join the lobby.");
      navigate("/login");
      return;
    }

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
      setSocketConnected(true);

      socket.emit("join-room", {
        joinID,
        user: {
          name: user.name,
          email: user.email,
        },
      });
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected");
      setSocketConnected(false);
    };

    const handleConnectError = (error) => {
      console.error("Socket connection error:", error.message);
      setSocketConnected(false);
    };

    const handleRoomUpdate = (room) => {
      if (room?.users) {
        setUsers(room.users);
      }
    };

    const handleAllUsersReady = () => {
      navigate(`/eventquiz/${joinID}`);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);
    socket.on("room-update", handleRoomUpdate);
    socket.on("all-users-ready", handleAllUsersReady);

    // Socket may already be connected
    if (socket.connected) {
      socket.emit("join-room", {
        joinID,
        user: {
          name: user.name,
          email: user.email,
        },
      });
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
      socket.off("room-update", handleRoomUpdate);
      socket.off("all-users-ready", handleAllUsersReady);
    };
  }, [joinID, user, navigate]);

  const handleStart = () => {
    if (!socket.connected) {
      alert("Connection to the game server is lost. Please try again.");
      return;
    }

    if (users.length < 2) {
      alert("At least 2 players are required to start the quiz.");
      return;
    }

    socket.emit("start-quiz", {
      joinID,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-4">
          Event Lobby
        </h2>

        <p className="text-center text-gray-700 mb-2">
          Join ID:{" "}
          <span className="font-mono font-semibold">{joinID}</span>
        </p>

        <p
          className={`text-center text-sm mb-6 ${
            socketConnected ? "text-green-600" : "text-red-600"
          }`}
        >
          {socketConnected ? "● Connected" : "● Connecting..."}
        </p>

        <div className="bg-gray-100 rounded-lg p-4 max-h-60 overflow-y-auto shadow-inner mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Players ({users.length})
          </h3>

          {users.length === 0 ? (
            <p className="text-center text-gray-500">
              Waiting for players...
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {users.map((u) => {
                const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  u.name
                )}&background=random&color=fff&size=64`;

                return (
                  <div
                    key={u.email}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden shadow-md">
                      <img
                        src={avatarUrl}
                        alt={`${u.name}'s avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <p className="mt-2 text-sm font-medium text-gray-800 truncate max-w-full">
                      {u.name}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button
          onClick={handleStart}
          disabled={users.length < 2 || !socketConnected}
          className={`w-full py-3 rounded-full text-white font-semibold transition ${
            users.length < 2 || !socketConnected
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {!socketConnected
            ? "Connecting..."
            : users.length < 2
            ? "Waiting for Players..."
            : "Start Quiz"}
        </button>
      </div>
    </div>
  );
}

export default EventLobby;