import React from "react";

function QuestionCard({ title, imgSrc, desc ,button}) {
  return (
    <div className="bg-purple-100 p-6 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 w-full max-w-sm flex flex-col items-center">
      <div className="w-full h-48 mb-4 overflow-hidden rounded-md bg-white flex justify-center items-center">
        <img src={imgSrc} alt={title} className="w-full h-full object-fill" />
      </div>
      <h2 className="text-xl font-bold mb-2 text-black">{title}</h2>
      <p className="text-gray-700 text-sm">{desc}</p>
     <span>{button}</span>
    </div>
  );
}

export default QuestionCard;
