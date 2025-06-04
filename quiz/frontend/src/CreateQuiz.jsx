
function CreateQuiz() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-600 px-4 py-8">
      <form className="bg-purple-100 rounded-3xl shadow-2xl p-4 w-full max-w-xl m-15 space-y-6 transform hover:scale-105 transition-transform">
        <h1 className="text-3xl font-bold text-center text-blue-500">
          Create Quiz
        </h1>

        {/* Level Select */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">
            Select Level <span><sup className="text-xl text-red-600">*</sup></span>
          </label>
          <select className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Question */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">
            Question <span><sup className="text-lg text-red-600">*</sup></span>
          </label>
          <input required
            type="text"
            placeholder="Enter your question"
            className="w-full h-12 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Options */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Options <span><sup className="text-xl text-red-600">*</sup></span>
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

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">
            Correct Answer <span><sup className="text-lg text-red-600">*</sup></span>
          </label>
          <input required
            type="text"
            placeholder="Enter correcr answer"
            className="w-full h-12 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-red-400 text-white font-semibold py-2 rounded-full shadow-md hover:cursor-pointer"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
}

export default CreateQuiz;
