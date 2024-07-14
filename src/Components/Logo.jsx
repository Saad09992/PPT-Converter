import React from "react";

function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <svg
        className="w-10 h-10 text-blue-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        ></path>
      </svg>
      <div className="text-xl font-bold">
        <span className="text-blue-500">PPT</span>
        <span className="text-white">2Guide</span>
      </div>
    </div>
  );
}

export default Logo;
