
function CreateQuiz() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-600 px-4 py-8">
      <form className="bg-purple-100 rounded-3xl shadow-2xl p-8 w-full max-w-xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-500">
          Create Quiz
        </h1>

        {/* Level Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Level
          </label>
          <select className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Question */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question
          </label>
          <input
            type="text"
            placeholder="Enter your question"
            className="w-full h-20 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Options
          </label>
          {[1, 2, 3, 4].map((num) => (
            <input
              key={num}
              type="text"
              placeholder={`Option ${num}`}
              className="w-full border rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className="w-full bg-indigo-600 hover:bg-red-400 text-white font-semibold py-2 rounded-lg shadow-md"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
}

export default CreateQuiz;
