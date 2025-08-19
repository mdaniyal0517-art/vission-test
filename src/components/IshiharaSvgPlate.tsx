import React from 'react';

interface IshiharaSvgPlateProps {
  numberToDisplay: string;
  size?: number;
}

const IshiharaSvgPlate: React.FC<IshiharaSvgPlateProps> = ({ numberToDisplay, size = 250 }) => {
  const numDots = 1000; // Increased number of dots for even more visual noise
  const minDotRadius = 0.8; // Slightly smaller min radius
  const maxDotRadius = 4.0; // Slightly smaller max radius, to make dots less distinct

  // Even more ambiguous color palette, focusing on greens, yellows, and browns that are easily confused
  // These colors are chosen to be very close in perceived lightness and saturation for color-deficient vision
  const commonColors = [
    '#808000', // Olive
    '#6B8E23', // Olive Drab
    '#556B2F', // Dark Olive Green
    '#DAA520', // Goldenrod
    '#B8860B', // Dark Goldenrod
    '#A52A2A', // Brown
    '#BDB76B', // Dark Khaki
    '#9ACD32', // Yellow Green (slightly desaturated)
    '#CD5C5C', // Indian Red (desaturated)
  ];

  const getRandomPosition = (max: number) => Math.random() * max;
  const getRandomDotRadius = () => minDotRadius + Math.random() * (maxDotRadius - minDotRadius);
  const getRandomColor = () => commonColors[Math.floor(Math.random() * commonColors.length)];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="rounded-full border border-gray-300 dark:border-gray-600 shadow-md"
    >
      <defs>
        <filter id="blurFilter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" /> {/* Increased blur */}
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
        fill={getRandomColor()} // Use the same color pool for the number
        className="font-sans"
        filter="url(#blurFilter)" // Apply blur to text
      >
        {numberToDisplay}
      </text>
    </svg>
  );
};

export default IshiharaSvgPlate;