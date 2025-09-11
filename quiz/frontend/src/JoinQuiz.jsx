import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext"; // Your login context
import socket from "./Socket"; // your configured socket connection
import axios from "axios";

function JoinQuiz() {
  const [joinID, setJoinID] = useState("");
  const { user } = useAuth(); // Assumes you have name and email in context
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return alert("Login required");
    axios
      .get(`/api/user/rooms/${encodeURIComponent(joinID)}`)
      .then((res) => {
        if (res.data?.valid) {
          socket.emit("join-room", {
            joinID,
            user: { name: user.name, email: user.email },
          });
          navigate(`/event-lobby/${joinID}`);
        } else {
          alert("Invalid or inactive room code.");
        }
      })
      .catch(() => alert("Invalid or inactive room code."));
  };

  const handleGenerate = async () => {
    try {
      const res = await axios.get("/api/user/roomcode", {
        params: {},
      });
      if (res.data?.code) {
        setJoinID(res.data.code);
        // Create room in DB (already done server-side in controller)
        navigate(`/event-lobby/${res.data.code}`);
      }
    } catch (e) {
      alert("Failed to create room");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#74ebd5] via-[#acb6e5] to-[#ffffff] flex items-center justify-center px-4">
      <div className="bg-purple-100 rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
          Join a Quiz
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-lg text-gray-700">
            Enter room code (e.g. ABCD1234-XYZ789)
          </label>
          <input
            required
            type="text"
            value={joinID}
            onChange={(e) => setJoinID(e.target.value)}
            placeholder="e.g. ABCD1234-XYZ789"
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={handleGenerate}
            className="w-full bg-gray-200 text-gray-800 py-2 rounded-full hover:bg-gray-300"
          >
            Generate Code
          </button>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-red-400 transition"
          >
            Join Quiz
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinQuiz;
