import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext'; // Your login context
import socket from './Socket'; // your configured socket connection

function JoinQuiz() {
  const [joinID, setJoinID] = useState('');
  const { user } = useAuth(); // Assumes you have name and email in context
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return alert("Login required");

    socket.emit('join-room', {
      joinID,
      user: {
        name: user.name,
        email: user.email
      }
    });

    navigate(`/event-lobby/`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#74ebd5] via-[#acb6e5] to-[#ffffff] flex items-center justify-center px-4">
      <div className="bg-purple-100 rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
          Join a Quiz
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-lg text-gray-700">
            Enter 8-character Join ID <span><sup className="text-xl text-red-600">*</sup></span>
          </label>
          <input
            required
            type="text"
            maxLength={8}
            value={joinID}
            onChange={(e) => setJoinID(e.target.value)}
            placeholder="e.g. AB12CD34"
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
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
