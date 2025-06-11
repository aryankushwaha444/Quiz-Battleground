import React from "react";

function QuestionCard({ question, option = [], selectedOption, onSelectOption, disabled }) {
  return (
    <div className="bg-purple-100 p-6 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 w-full max-w-sm flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-black">{question}</h2>
      <div className="space-y-4">
        {option.length > 0 ? (
          option.map((opt, index) => (
            <label
              key={index}
              className={`block cursor-pointer px-4 py-3 rounded-lg border bg-white border-gray-300 hover:border-indigo-500 transition duration-300 ${
                selectedOption === opt ? "border-indigo-600 bg-indigo-100" : "No any Option Available"
              }`}
            >
              <input
                type="radio"
                name="quiz-option"
                value={opt}
                className="hidden"
                checked={selectedOption === opt}
                onChange={() => onSelectOption(opt)}
                disabled={disabled}
              />
              {opt}
            </label>
          ))
        ) : (
          <div className="text-gray-500">No options available</div>
        )}
      </div>
    </div>
  );
}

export default QuestionCard;
