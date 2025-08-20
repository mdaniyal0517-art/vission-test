import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ruler, Monitor } from "lucide-react"; // Icons for visual cues

interface DistanceCalibrationProps {
  onProceed: () => void;
}

const DistanceCalibration: React.FC<DistanceCalibrationProps> = ({ onProceed }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
      <Card className="w-full max-w-lg shadow-lg text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            <Ruler className="inline-block mr-2 h-6 w-6" />
            Calibrate Your Viewing Distance
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            For accurate results, please position yourself correctly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700 dark:text-gray-300">
          <div className="flex flex-col items-center space-y-4">
            <Monitor className="h-16 w-16 text-blue-500" />
            <p className="text-lg font-semibold">Optimal Distance:</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
              10 feet (approx. 3 meters)
            </p>
            <p className="text-base">
              If 10 feet is not possible, please sit at least{" "}
              <span className="font-bold text-blue-600 dark:text-blue-400">
                4 feet (approx. 1.3 meters)
              </span>{" "}
              away from your screen.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ensure your screen is at eye level and you are in a well-lit room.
            </p>
          </div>
          <Button onClick={onProceed} className="w-full mt-4">
            I'm at the correct distance
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DistanceCalibration;