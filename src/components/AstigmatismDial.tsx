import React from 'react';

const AstigmatismDial: React.FC = () => {
  const numLines = 12; // Number of radial lines
  const radius = 100; // Radius of the dial
  const strokeWidth = 2; // Thickness of the lines

  // Calculate the angle for each line
  const angleStep = 360 / numLines;

  return (
    <div className="flex items-center justify-center p-4">
      <svg
        width={radius * 2 + strokeWidth * 2}
        height={radius * 2 + strokeWidth * 2}
        viewBox={`0 0 ${radius * 2 + strokeWidth * 2} ${radius * 2 + strokeWidth * 2}`}
        className="border-2 border-gray-400 rounded-full"
      >
        {/* Center circle */}
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={5}
          fill="currentColor"
          className="text-gray-800 dark:text-gray-200"
        />
        {/* Radial lines */}
        {Array.from({ length: numLines }).map((_, i) => {
          const angle = i * angleStep;
          const x1 = radius + strokeWidth;
          const y1 = radius + strokeWidth;
          const x2 = x1 + radius * Math.cos((angle - 90) * Math.PI / 180);
          const y2 = y1 + radius * Math.sin((angle - 90) * Math.PI / 180);

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-gray-800 dark:text-gray-200"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default AstigmatismDial;