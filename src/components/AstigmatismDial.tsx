import React from 'react';

const AstigmatismDial: React.FC = () => {
  const numLines = 12; // Number of radial lines
  const radius = 100; // Radius of the dial
  const strokeWidth = 1; // Consistent line thickness

  // Calculate the angle for each line
  const angleStep = 360 / numLines;

  // Calculate center coordinates based on radius and strokeWidth for accurate positioning
  const centerX = radius + strokeWidth;
  const centerY = radius + strokeWidth;

  return (
    <div className="flex items-center justify-center p-4">
      <svg
        width={radius * 2 + strokeWidth * 2}
        height={radius * 2 + strokeWidth * 2}
        viewBox={`0 0 ${radius * 2 + strokeWidth * 2} ${radius * 2 + strokeWidth * 2}`}
        className="border-2 border-gray-400 rounded-full bg-white dark:bg-gray-900" // Ensure white background for light mode, dark for dark mode
      >
        {/* Background circle to ensure a clean white canvas for the lines */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="white" // Explicitly white background for the dial itself
          className="dark:fill-gray-800" // Dark background for dark mode
        />
        {/* Radial lines */}
        {Array.from({ length: numLines }).map((_, i) => {
          const angle = i * angleStep;
          const x1 = centerX;
          const y1 = centerY;
          const x2 = x1 + radius * Math.cos((angle - 90) * Math.PI / 180);
          const y2 = y1 + radius * Math.sin((angle - 90) * Math.PI / 180);

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="black" // Solid black lines
              strokeWidth={strokeWidth}
              className="dark:stroke-gray-200" // Light lines for dark mode
            />
          );
        })}
      </svg>
    </div>
  );
};

export default AstigmatismDial;