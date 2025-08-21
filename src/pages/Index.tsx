"use client";

import React, { useState, useRef, useEffect } from "react";
import Disclaimer from "@/components/Disclaimer";
import { MadeWithDyad } from "@/components/made-with-dyad";
import AstigmatismDial from "@/components/AstigmatismDial";
import SnellenChart from "@/components/SnellenChart";
import IshiharaPlate from "@/components/IshiharaPlate";
import Results from "@/components/Results";
import DistanceCalibration from "@/components/DistanceCalibration";
import CameraCalibration from "@/components/CameraCalibration";
import { showSuccess, showError } from "@/utils/toast";
import { useTranslation } from 'react-i18next'; // Import useTranslation

// Define the possible steps in our application flow
type AppStep = "disclaimer" | "cameraCalibration" | "distanceCalibration" | "visualAcuity" | "astigmatism" | "colorVision" | "results";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>("disclaimer");
  const [visualAcuityResult, setVisualAcuityResult] = useState<"good" | "needs_check" | null>(null);
  const [astigmatismResult, setAstigmatismResult] = useState<"none" | "possible" | null>(null);
  const [colorVisionResult, setColorVisionResult] = useState<"normal" | "possible_deficiency" | null>(null);
  const { t } = useTranslation(); // Initialize useTranslation

  const handleAgreeToDisclaimer = () => {
    setCurrentStep("cameraCalibration");
  };

  const handleRetakeTest = () => {
    setCurrentStep("disclaimer");
    setVisualAcuityResult(null);
    setAstigmatismResult(null);
    setColorVisionResult(null);
  };

  const VisualAcuityTest = () => {
    const [currentSnellenIndex, setCurrentSnellenIndex] = useState(0);

    const snellenLetters = [
      { letter: "E", size: "text-[150px]" },
      { letter: "F", size: "text-[100px]" },
      { letter: "P", size: "text-[60px]" },
      { letter: "Z", size: "text-[40px]" },
      { letter: "D", size: "text-[20px]" },
    ];

    const handleCanRead = () => {
      if (currentSnellenIndex < snellenLetters.length - 1) {
        setCurrentSnellenIndex(prev => prev + 1);
        showSuccess(t("good_acuity_toast"));
      } else {
        showSuccess(t("excellent_acuity_toast"));
        setVisualAcuityResult("good");
        setCurrentStep("astigmatism");
      }
    };

    const handleCannotRead = () => {
      showError(t("difficulty_acuity_toast"));
      setVisualAcuityResult("needs_check");
      setCurrentStep("astigmatism");
    };

    const currentLetter = snellenLetters[currentSnellenIndex];

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">{t('visual_acuity_title')}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {t('visual_acuity_instruction')}
        </p>

        <div className="my-8">
          <SnellenChart letter={currentLetter.letter} sizeClass={currentLetter.size} />
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={handleCanRead}
            className="px-6 py-3 bg-green-600 text-white rounded-md text-lg hover:bg-green-700 transition-colors"
          >
            {t('yes_can_read')}
          </button>
          <button
            onClick={handleCannotRead}
            className="px-6 py-3 bg-red-600 text-white rounded-md text-lg hover:bg-red-700 transition-colors"
          >
            {t('no_cannot_read')}
          </button>
        </div>
        <MadeWithDyad />
      </div>
    );
  };

  const AstigmatismDialTest = () => {
    const handleLinesDifferent = () => {
      showError(t("possible_astigmatism_toast"));
      setAstigmatismResult("possible");
      setCurrentStep("colorVision");
    };

    const handleLinesSame = () => {
      showSuccess(t("no_astigmatism_toast"));
      setAstigmatismResult("none");
      setCurrentStep("colorVision");
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">{t('astigmatism_title')}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {t('astigmatism_instruction')}
        </p>
        <AstigmatismDial />
        <div className="flex space-x-4 mt-8">
          <button
            onClick={handleLinesDifferent}
            className="px-6 py-3 bg-red-600 text-white rounded-md text-lg hover:bg-red-700 transition-colors"
          >
            {t('lines_different')}
          </button>
          <button
            onClick={handleLinesSame}
            className="px-6 py-3 bg-green-600 text-white rounded-md text-lg hover:bg-green-700 transition-colors"
          >
            {t('lines_same')}
          </button>
        </div>
        <MadeWithDyad />
      </div>
    );
  };

  const ColorVisionTest = () => {
    const [currentPlateIndex, setCurrentPlateIndex] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);

    const ishiharaPlates = [
      { id: 1, correctAnswer: "29", numberForSvg: "29" },
      { id: 2, correctAnswer: "74", numberForSvg: "74" },
      { id: 3, correctAnswer: "5", numberForSvg: "5" },
      { id: 4, correctAnswer: "15", numberForSvg: "15" },
    ];

    const handleAnswerSubmit = () => {
      const currentPlate = ishiharaPlates[currentPlateIndex];
      if (inputValue.trim() === currentPlate.correctAnswer) {
        showSuccess(t("correct_answer_toast"));
      } else {
        showError(t("incorrect_answer_toast", { correctAnswer: currentPlate.correctAnswer }));
        setIncorrectAnswersCount(prev => prev + 1);
      }

      if (currentPlateIndex < ishiharaPlates.length - 1) {
        setCurrentPlateIndex(prev => prev + 1);
        setInputValue("");
      } else {
        if (incorrectAnswersCount > 1) {
          setColorVisionResult("possible_deficiency");
          showError(t("color_vision_completed_deficiency_toast"));
        } else {
          setColorVisionResult("normal");
          showSuccess(t("color_vision_completed_normal_toast"));
        }
        setCurrentStep("results");
      }
    };

    const currentPlate = ishiharaPlates[currentPlateIndex];

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">{t('color_vision_title')}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {t('color_vision_instruction', { current: currentPlateIndex + 1, total: ishiharaPlates.length })}
        </p>

        <IshiharaPlate
          plateNumber={currentPlate.id}
          onAnswerChange={setInputValue}
          inputValue={inputValue}
          correctAnswerForSvg={currentPlate.numberForSvg}
        />

        <button
          onClick={handleAnswerSubmit}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 transition-colors"
        >
          {t('submit_answer_button')}
        </button>
        <MadeWithDyad />
      </div>
    );
  };

  return (
    <>
      {currentStep === "disclaimer" && <Disclaimer onAgree={handleAgreeToDisclaimer} />}
      {currentStep === "cameraCalibration" && <CameraCalibration onProceed={() => setCurrentStep("distanceCalibration")} />}
      {currentStep === "distanceCalibration" && <DistanceCalibration onProceed={() => setCurrentStep("visualAcuity")} />}
      {currentStep === "visualAcuity" && <VisualAcuityTest />}
      {currentStep === "astigmatism" && <AstigmatismDialTest />}
      {currentStep === "colorVision" && <ColorVisionTest />}
      {currentStep === "results" && (
        <Results
          visualAcuityResult={visualAcuityResult}
          astigmatismResult={astigmatismResult}
          colorVisionResult={colorVisionResult}
          onRetakeTest={handleRetakeTest}
        />
      )}
    </>
  );
};

export default Index;