import React from "react";

const TabSwitchWarning = ({ timeLeft, onReturn }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
        <div className="text-red-500 text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Ended!</h2>
        <p className="text-gray-600 mb-6">
          You switched away from the quiz. The quiz has been automatically
          submitted.
        </p>
        <div className="text-lg font-bold text-red-500 mb-6">
          No second chances!
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Stay focused on the quiz to avoid automatic submission.
        </p>
        <button
          onClick={onReturn}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TabSwitchWarning;
