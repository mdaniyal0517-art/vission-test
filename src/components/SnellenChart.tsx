import React from 'react';
import { cn } from '@/lib/utils';

interface SnellenChartProps {
  letter: string;
  sizeClass: string; // e.g., "text-[200px]", "text-[150px]"
}

const SnellenChart: React.FC<SnellenChartProps> = ({ letter, sizeClass }) => {
  return (
    <div className={cn("font-mono font-bold text-center", sizeClass, "text-gray-800 dark:text-gray-100")}>
      {letter}
    </div>
  );
};

export default SnellenChart;