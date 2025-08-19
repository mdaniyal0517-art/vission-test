import React from 'react';

interface IshiharaSvgPlateProps {
  numberToDisplay: string;
  size?: number;
}

const IshiharaSvgPlate: React.FC<IshiharaSvgPlateProps> = ({ numberToDisplay, size = 250 }) => {
  const numDots = 800; // Increased number of dots for even more visual noise
  const minDotRadius = 1.0;
  const maxDotRadius = 4.5; // Wider range for dot sizes

  // Even more ambiguous color palette, focusing on greens, yellows, and browns that are easily confused
  const colors = [
    '#808000', // Olive
    '#6B8E23', // Olive Drab
    '#556B2F', // Dark Olive Green
    '#9ACD32', // Yellow Green
    '#ADFF2F', // Green Yellow
    '#DAA520', // Goldenrod
    '#B8860B', // Dark Goldenrod
    '#CD5C5C', // Indian Red (subtle inclusion for red-green confusion)
    '#A52A2A', // Brown (subtle inclusion)
    '#F0E68C', // Khaki
    '#EEE8AA', // Pale Goldenrod
    '#BDB76B', // Dark Khaki
  ];

  // For the number, pick colors that are designed to blend almost perfectly with the background
  const numberTextColors = [
    '#808000', // Olive
    '#6B8E23', // Olive Drab
    '#DAA520', // Goldenrod
    '#B8860B', // Dark Goldenrod
    '#CD5C5C', // Indian Red
    '#A52A2A', // Brown
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
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.0" /> {/* Slightly increased blur */}
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