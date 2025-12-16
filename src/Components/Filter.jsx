import React from "react";

export default function Filter() {
  return (
    <div className="mb-2 mt-4 flex justify-between gap-3 pr-12">
      <div className="flex gap-3">
        <button className="px-4 py-2  bg-blue-500 text-white rounded-md">
          Todos
        </button>
        <button className="px-4 py-2  bg-gray-100 text-gray-600 rounded-md">
          Helados
        </button>
        <button className="px-4 py-2  bg-gray-100 text-gray-600 rounded-md">
          Lacteos
        </button>
      </div>

      <div className="flex gap-3">
        <button className="px-4 py-4  bg-gray-100 text-gray-600  rounded-full hover:bg-blue-500 cursor-pointer hover:text-white">
          {" "}
          {/* Ícono de flecha */}
          <svg
            className="w-5 h-5 text-gray-400 rotate-90 hover:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <button className="px-4 py-4  bg-gray-100 text-gray-600  rounded-full hover:bg-blue-500 cursor-pointer">
          {" "}
          {/* Ícono de flecha */}
          <svg
            className="w-5 h-5 text-gray-400 rotate-270 hover:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
