function JoinQuiz()
{

return (
<div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-600 flex items-center justify-center px-4">
    <div className="bg-purple-100 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
        Join a Quiz
      </h2>
      <form className="space-y-4">
        <label className="block text-lg text-gray-700">
          Enter 8-character Join ID:
        </label>
        <input
          type="text"
          maxLength={8}
          placeholder="e.g. AB12CD34"
          className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-red-400 transition"
        >
          Join Quiz
        </button>
      </form>
    </div>
  </div>
)
}

export default JoinQuiz;
