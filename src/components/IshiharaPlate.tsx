import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import IshiharaSvgPlate from './IshiharaSvgPlate'; // Import the new SVG component

interface IshiharaPlateProps {
  imageUrl?: string; // Make imageUrl optional
  plateNumber: number;
  onAnswerChange: (value: string) => void;
  inputValue: string;
  correctAnswerForSvg?: string; // New prop for SVG plate's number
}

const IshiharaPlate: React.FC<IshiharaPlateProps> = ({ imageUrl, plateNumber, onAnswerChange, inputValue, correctAnswerForSvg }) => {
  return (
    <div className="flex flex-col items-center space-y-6 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Ishihara Plate {plateNumber}</h2>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`Ishihara Plate ${plateNumber}`}
          className="w-64 h-64 object-contain rounded-md border border-gray-300 dark:border-gray-600"
        />
      ) : (
        <IshiharaSvgPlate numberToDisplay={correctAnswerForSvg || "0"} size={256} /> // Use SVG component
      )}
      <div className="w-full max-w-xs">
        <Label htmlFor="ishihara-answer" className="text-lg text-gray-700 dark:text-gray-200 mb-2 block">
          What number do you see?
        </Label>
        <Input
          id="ishihara-answer"
          type="number"
          value={inputValue}
          onChange={(e) => onAnswerChange(e.target.value)}
          className={cn(
            "w-full text-center text-xl py-2",
            "bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-gray-100",
            "border border-gray-300 dark:border-gray-500 rounded-md focus:ring-blue-500 focus:border-blue-500"
          )}
          placeholder="Enter number"
        />
      </div>
    </div>
  );
};

export default IshiharaPlate;