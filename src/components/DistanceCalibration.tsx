import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ruler, Monitor } from "lucide-react";
import { useTranslation } from 'react-i18next'; // Import useTranslation

interface DistanceCalibrationProps {
  onProceed: () => void;
}

const DistanceCalibration: React.FC<DistanceCalibrationProps> = ({ onProceed }) => {
  const { t } = useTranslation(); // Initialize useTranslation

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
      <Card className="w-full max-w-lg shadow-lg text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            <Ruler className="inline-block mr-2 h-6 w-6" />
            {t('calibrate_distance_title')}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            {t('calibrate_distance_description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700 dark:text-gray-300">
          <div className="flex flex-col items-center space-y-4">
            <Monitor className="h-16 w-16 text-blue-500" />
            <p className="text-lg font-semibold">{t('optimal_distance')}</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {t('optimal_distance_value')}
            </p>
            <p className="text-base">
              {t('minimum_distance_instruction', { distance: t('minimum_distance_value') })}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('screen_eye_level_instruction')}
            </p>
          </div>
          <Button onClick={onProceed} className="w-full mt-4">
            {t('im_at_correct_distance_button')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DistanceCalibration;