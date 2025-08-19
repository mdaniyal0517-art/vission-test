import React from 'react';

interface IshiharaSvgPlateProps {
  numberToDisplay: string;
  size?: number;
}

const IshiharaSvgPlate: React.FC<IshiharaSvgPlateProps> = ({ numberToDisplay, size = 250 }) => {
  const numDots = 1200; // Increased number of dots for a denser pattern
  const minDotRadius = 0.8;
  const maxDotRadius = 3.5; // Adjusted dot sizes for a more refined look

  // Colors for the background dots (greens, yellows, browns)
  const backgroundDotColors = [
    '#008000', // Green
    '#32CD32', // Lime Green
    '#ADFF2F', // Green Yellow
    '#9ACD32', // Yellow Green
    '#6B8E23', // Olive Drab
    '#808000', // Olive
    '#BDB76B', // Dark Khaki
    '#DAA520', // Goldenrod
    '#A52A2A', // Brownish Red (for blending with number for colorblind)
    '#CD853F', // Peru (brownish orange)
  ];

  // Colors for the number (reds, oranges, purples) - designed to contrast for normal vision
  // but blend with background for red-green colorblindness
  const numberColors = [
    '#FF0000', // Red
    '#FF4500', // OrangeRed
    '#DC143C', // Crimson
    '#B22222', // FireBrick
    '#8B0000', // DarkRed
    '#800080', // Purple
    '#4B0082', // Indigo (for blue contrast)
  ];

  const getRandomPosition = (max: number) => Math.random() * max;
  const getRandomDotRadius = () => minDotRadius + Math.random() * (maxDotRadius - minDotRadius);
  const getRandomBackgroundDotColor = () => backgroundDotColors[Math.floor(Math.random() * backgroundDotColors.length)];
  const getRandomNumberColor = () => numberColors[Math.floor(Math.random() * numberColors.length)];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="rounded-full border-2 border-gray-400 dark:border-gray-600 shadow-lg bg-gray-50 dark:bg-gray-700"
    >
      <defs>
        <filter id="dotBlurFilter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" /> {/* Slight blur for dots */}
        </filter>
      </defs>
      {/* Background dots - filling the entire circle */}
      {Array.from({ length: numDots }).map((_, i) => (
        <circle
          key={i}
          cx={getRandomPosition(size)}
          cy={getRandomPosition(size)}
          r={getRandomDotRadius()}
          fill={getRandomBackgroundDotColor()}
          filter="url(#dotBlurFilter)"
        />
      ))}
      {/* The number text, with a color that contrasts for normal vision */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={size / 2.8} // Slightly larger font for clarity
        fontWeight="bold"
        fill={getRandomNumberColor()}
        className="font-sans select-none" // Prevent text selection
      >
        {numberToDisplay}
      </text>
    </svg>
  );
};

export default IshiharaSvgPlate;