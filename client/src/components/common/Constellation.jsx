import React from "react";

// A simple, elegant constellation graphic
export const Constellation = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      {...props}
    >
      <circle cx="15" cy="15" r="2.5" fill="currentColor" />
      <circle cx="45" cy="30" r="3" fill="currentColor" />
      <circle cx="80" cy="20" r="2" fill="currentColor" />
      <circle cx="65" cy="55" r="3.5" fill="currentColor" />
      <circle cx="30" cy="70" r="2.5" fill="currentColor" />
      <circle cx="85" cy="85" r="2.5" fill="currentColor" />

      <path
        d="M 15 15 L 45 30 L 80 20 L 65 55 L 85 85 L 65 55 L 30 70 Z"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
};
