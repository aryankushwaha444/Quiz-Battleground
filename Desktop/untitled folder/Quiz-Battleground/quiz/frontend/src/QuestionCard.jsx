import React from "react";

function QuestionCard({
  question,
  option = [],
  selectedOption,
  onSelectOption,
  disabled,
  submitted,
  correctAnswer,
}) {
  return (
    <div className="bg-purple-100 p-6 rounded-xl shadow-2xl w-full max-w-sm flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-black">{question}</h2>
      <div className="space-y-4">
        {option.length > 0 ? (
          option.map((opt, index) => {
            // Determine background color based on submission
            let bgColor = "bg-white border-gray-300"; // default
            if (submitted) {
              if (opt === correctAnswer) {
                bgColor = "bg-green-300 border-green-600"; // correct answer
              } else if (opt === selectedOption && opt !== correctAnswer) {
                bgColor = "bg-red-300 border-red-600"; // wrong selection
              }
            } else if (selectedOption === opt) {
              bgColor = "bg-indigo-100 border-indigo-600"; // highlight selection before submit
            }

            return (
              <label
                key={index}
                className={`block cursor-pointer px-4 py-3 rounded-lg border ${bgColor} hover:border-indigo-500 transition duration-300`}
              >
                <input
                  type="radio"
                  name="quiz-option"
                  value={opt}
                  className="hidden"
                  checked={selectedOption === opt}
                  onChange={() => onSelectOption(opt)}
                  disabled={disabled || submitted} // prevent changing after submit
                />
                {opt}
              </label>
            );
          })
        ) : (
          <div className="text-gray-500">No options available</div>
        )}
      </div>
    </div>
  );
}

export default QuestionCard;
