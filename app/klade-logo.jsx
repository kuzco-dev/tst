import * as React from "react";

const KladeLogo = (props) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#388BFF", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#85B8FF", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <g id="SVGRepo_iconCarrier">
      <title>Analogue icon</title>
      <path
        fill="url(#grad1)"
        d="M5.468 12.804a5.145 5.145 0 10-.644 10.27 5.145 5.145 0 00.644-10.27zm17.841 2.562L16.45 3.484a5.146 5.146 0 00-8.912 5.15l6.86 11.878a5.148 5.148 0 007.031 1.885 5.146 5.146 0 001.881-7.031z"
      />
    </g>
  </svg>
);

export default KladeLogo;
