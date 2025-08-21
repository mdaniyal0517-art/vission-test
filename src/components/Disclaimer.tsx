"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTranslation } from 'react-i18next'; // Import useTranslation
import LanguageSwitcher from "./LanguageSwitcher"; // Import LanguageSwitcher

interface DisclaimerProps {
  onAgree: () => void;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ onAgree }) => {
  const [agreed, setAgreed] = useState(false);
  const { t } = useTranslation(); // Initialize useTranslation

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <LanguageSwitcher /> {/* Add LanguageSwitcher here */}
      <Card className="w-full max-w-lg shadow-lg mt-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">{t('welcome_title')}</CardTitle>
          <CardDescription className="text-center">{t('disclaimer_description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            {t('disclaimer_paragraph_1')}
          </p>
          <p>
            {t('disclaimer_paragraph_2')}
          </p>
          <p>
            {t('disclaimer_paragraph_3')}
          </p>
          <div className="flex items-center space-x-2 mt-6">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(!!checked)}
            />
            <Label htmlFor="agree" className="text-base font-medium">
              {t('agree_checkbox')}
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={onAgree} disabled={!agreed} className="w-full">
            {t('start_vision_check_button')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Disclaimer;