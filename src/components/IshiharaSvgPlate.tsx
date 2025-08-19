import React from 'react';

interface IshiharaSvgPlateProps {
  numberToDisplay: string;
  size?: number;
}

const IshiharaSvgPlate: React.FC<IshiharaSvgPlateProps> = ({ numberToDisplay, size = 250 }) => {
  const numDots = 2000; // Increased number of dots for maximum visual noise
  const minDotRadius = 1.0;
  const maxDotRadius = 3.0; // Narrower range for dot sizes

  // A very ambiguous color palette, focusing on greens, yellows, and browns that are easily confused
  // These colors are chosen to be very close in perceived lightness and saturation for color-deficient vision
  const ambiguousColors = [
    '#808000', // Olive
    '#6B8E23', // Olive Drab
    '#556B2F', // Dark Olive Green
    '#DAA520', // Goldenrod
    '#B8860B', // Dark Goldenrod
    '#A52A2A', // Brown
    '#BDB76B', // Dark Khaki
    '#CD5C5C', // Indian Red (desaturated)
    '#D2B48C', // Tan
    '#F4A460', // Sandy Brown
    '#C0C0C0', // Silver (for some neutral blending)
  ];

  const getRandomPosition = (max: number) => Math.random() * max;
  const getRandomDotRadius = () => minDotRadius + Math.random() * (maxDotRadius - minDotRadius);
  const getRandomAmbiguousColor = () => ambiguousColors[Math.floor(Math.random() * ambiguousColors.length)];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="rounded-full border-2 border-gray-400 dark:border-gray-600 shadow-lg bg-gray-50 dark:bg-gray-700"
    >
      <defs>
        <filter id="dotBlurFilter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.0" /> {/* Slight blur for dots */}
        </filter>
        <filter id="textBlurFilter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" /> {/* Very subtle blur for text */}
        </filter>
      </defs>
      {/* Background dots - filling the entire circle */}
      {Array.from({ length: numDots }).map((_, i) => (
        <circle
          key={i}
          cx={getRandomPosition(size)}
          cy={getRandomPosition(size)}
          r={getRandomDotRadius()}
          fill={getRandomAmbiguousColor()}
          filter="url(#dotBlurFilter)"
        />
      ))}
      {/* The number text, with a color that blends more */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={size / 2.8}
        fontWeight="bold"
        fill={getRandomAmbiguousColor()} // Use the same ambiguous color pool for the number
        className="font-sans select-none" // Prevent text selection
        filter="url(#textBlurFilter)" // Apply subtle blur to text
      >
        {numberToDisplay}
      </text>
    </svg>
  );
};

export default IshiharaSvgPlate;