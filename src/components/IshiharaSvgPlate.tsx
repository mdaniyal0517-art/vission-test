import React from 'react';

interface IshiharaSvgPlateProps {
  numberToDisplay: string;
  size?: number;
}

const IshiharaSvgPlate: React.FC<IshiharaSvgPlateProps> = ({ numberToDisplay, size = 250 }) => {
  const numDots = 500; // Increased number of dots for more visual noise
  const minDotRadius = 1.5;
  const maxDotRadius = 3.5;

  // A wider range of similar colors for both background and text to make it harder
  // These colors are chosen to be somewhat ambiguous for color vision deficiencies
  const colors = [
    '#A0C49D', '#C4D7B2', '#E0FBE2', '#9EB38E', '#B5C99A', '#DDE7C7', '#87A96B', '#A2B98A', // Greens
    '#F0E68C', '#DAA520', '#CD853F', '#D2B48C', // Yellows, Oranges, Browns
    '#FFD700', '#FFA500', '#CD5C5C', '#8B0000' // Brighter yellows, oranges, reds (for subtle blending)
  ];

  // For the number, pick colors that are designed to blend more with the background
  // These are a subset of the main 'colors' array, chosen for lower contrast
  const numberTextColors = [
    '#9EB38E', '#B5C99A', '#DDE7C7', '#87A96B', '#A2B98A', // Similar greens
    '#CD5C5C', '#F4A460', '#DAA520', '#D2B48C' // Muted reds/oranges/yellows/browns
  ];

  const getRandomPosition = (max: number) => Math.random() * max;
  const getRandomDotRadius = () => minDotRadius + Math.random() * (maxDotRadius - minDotRadius);
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
  const getRandomNumberTextColor = () => numberTextColors[Math.floor(Math.random() * numberTextColors.length)];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="rounded-full border border-gray-300 dark:border-gray-600 shadow-md"
    >
      {/* Background dots - filling the entire circle */}
      {Array.from({ length: numDots }).map((_, i) => (
        <circle
          key={i}
          cx={getRandomPosition(size)}
          cy={getRandomPosition(size)}
          r={getRandomDotRadius()}
          fill={getRandomColor()}
        />
      ))}
      {/* The number text, with a color that blends more */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={size / 3}
        fontWeight="bold"
        fill={getRandomNumberTextColor()}
        className="font-sans"
      >
        {numberToDisplay}
      </text>
    </svg>
  );
};

export default IshiharaSvgPlate;