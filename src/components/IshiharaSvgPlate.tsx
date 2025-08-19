import React from 'react';

interface IshiharaSvgPlateProps {
  numberToDisplay: string;
  size?: number;
}

const IshiharaSvgPlate: React.FC<IshiharaSvgPlateProps> = ({ numberToDisplay, size = 250 }) => {
  const numDots = 700; // Increased number of dots for more visual noise
  const minDotRadius = 1.0;
  const maxDotRadius = 4.0; // Wider range for dot sizes

  // More ambiguous color palette for background and number
  // These colors are chosen to be somewhat ambiguous for red-green color vision deficiencies
  const colors = [
    '#8B0000', // Dark Red
    '#A52A2A', // Brown
    '#CD5C5C', // Indian Red
    '#F08080', // Light Coral
    '#DAA520', // Goldenrod
    '#B8860B', // Dark Goldenrod
    '#808000', // Olive
    '#6B8E23', // Olive Drab
    '#556B2F', // Dark Olive Green
    '#228B22', // Forest Green
    '#3CB371', // Medium Sea Green
    '#66CDAA', // Medium Aquamarine
    '#9ACD32', // Yellow Green
    '#ADFF2F', // Green Yellow
    '#FFD700', // Gold
    '#FFA500', // Orange
    '#FF8C00', // Dark Orange
  ];

  // For the number, pick colors that are designed to blend more with the background
  // These are a subset of the main 'colors' array, chosen for lower contrast
  // Specifically targeting colors that might be confused by red-green deficiencies
  const numberTextColors = [
    '#A52A2A', // Brown
    '#CD5C5C', // Indian Red
    '#DAA520', // Goldenrod
    '#808000', // Olive
    '#6B8E23', // Olive Drab
    '#556B2F', // Dark Olive Green
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
      <defs>
        <filter id="blurFilter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" /> {/* Subtle blur */}
        </filter>
      </defs>
      {/* Background dots - filling the entire circle */}
      {Array.from({ length: numDots }).map((_, i) => (
        <circle
          key={i}
          cx={getRandomPosition(size)}
          cy={getRandomPosition(size)}
          r={getRandomDotRadius()}
          fill={getRandomColor()}
          filter="url(#blurFilter)" // Apply blur to dots
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
        filter="url(#blurFilter)" // Apply blur to text
      >
        {numberToDisplay}
      </text>
    </svg>
  );
};

export default IshiharaSvgPlate;