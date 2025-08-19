import React from 'react';

interface IshiharaSvgPlateProps {
  numberToDisplay: string;
  size?: number;
}

const IshiharaSvgPlate: React.FC<IshiharaSvgPlateProps> = ({ numberToDisplay, size = 250 }) => {
  const numDots = 300;
  const dotRadius = 3;
  const colors = ['#A0C49D', '#C4D7B2', '#E0FBE2', '#9EB38E', '#B5C99A', '#DDE7C7', '#87A96B', '#A2B98A']; // Greenish/brownish tones
  const textColors = ['#333', '#555', '#777']; // Darker tones for the number

  const getRandomPosition = (max: number) => Math.random() * max;
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
  const getRandomTextColor = () => textColors[Math.floor(Math.random() * textColors.length)];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="rounded-full border border-gray-300 dark:border-gray-600 shadow-md"
    >
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill="#F0F0F0" className="dark:fill-gray-800" />
      {Array.from({ length: numDots }).map((_, i) => (
        <circle
          key={i}
          cx={getRandomPosition(size)}
          cy={getRandomPosition(size)}
          r={dotRadius}
          fill={getRandomColor()}
        />
      ))}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={size / 3}
        fontWeight="bold"
        fill={getRandomTextColor()}
        className="font-sans"
      >
        {numberToDisplay}
      </text>
    </svg>
  );
};

export default IshiharaSvgPlate;