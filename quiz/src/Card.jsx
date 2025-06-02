import React from 'react'

function Card({ title, icon, desc, btnText, btnColor, onClick }) {
    return (
      <div className="bg-purple-100 p-6 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 w-full max-w-sm text-center">
        <div className="text-4xl mb-4">{icon}</div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{desc}</p>
        <button
          onClick={onClick}
          className={`text-white font-medium py-2 px-5 rounded-full shadow-md cursor-pointer duration-300 transform hover:scale-105 transition-transform ${btnColor}`}
        >
          {btnText}
        </button>
      </div>
    );
  }

export default Card;