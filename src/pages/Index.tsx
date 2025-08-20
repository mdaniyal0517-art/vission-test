"use client";

import React, { useState, useRef, useEffect } from "react";
import Disclaimer from "@/components/Disclaimer";
import { MadeWithDyad } from "@/components/made-with-dyad";
import AstigmatismDial from "@/components/AstigmatismDial";
import SnellenChart from "@/components/SnellenChart";
import IshiharaPlate from "@/components/IshiharaPlate";
import Results from "@/components/Results";
import DistanceCalibration from "@/components/DistanceCalibration"; // Import the new component
import { showSuccess, showError } from "@/utils/toast";

// Define the possible steps in our application flow
type AppStep = "disclaimer" | "calibration" | "distanceCalibration" | "visualAcuity" | "astigmatism" | "colorVision" | "results";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>("disclaimer");
  const [visualAcuityResult, setVisualAcuityResult] = useState<"good" | "needs_check" | null>(null);
  const [astigmatismResult, setAstigmatismResult] = useState<"none" | "possible" | null>(null);
  const [colorVisionResult, setColorVisionResult] = useState<"normal" | "possible_deficiency" | null>(null);

  const handleAgreeToDisclaimer = () => {
    setCurrentStep("calibration");
  };

  const handleRetakeTest = () => {
    // Reset all states and go back to disclaimer
    setCurrentStep("disclaimer");
    setVisualAcuityResult(null);
    setAstigmatismResult(null);
    setColorVisionResult(null);
  };

  const Calibration = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [cameraActive, setCameraActive] = useState(false);

    useEffect(() => {
      const enableCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setCameraActive(true);
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
          showError("Failed to access camera. Please grant permission.");
          setCameraActive(false);
        }
      };

      enableCamera();

      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        }
      };
    }, []);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Calibration Step</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          Please grant camera permission to proceed with the vision check.
        </p>
        <div className="w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg mb-6 relative">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto object-cover"></video>
          {!cameraActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl">
              Waiting for camera access...
            </div>
          )}
        </div>
        <button
          onClick={() => setCurrentStep("distanceCalibration")}
          disabled={!cameraActive}
          className={`mt-8 px-6 py-3 rounded-md text-lg transition-colors ${
            cameraActive ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          {cameraActive ? "Proceed to Distance Calibration" : "Waiting for Camera..."}
        </button>
        <MadeWithDyad />
      </div>
    );
  };

  const VisualAcuityTest = () => {
    const [currentSnellenIndex, setCurrentSnellenIndex] = useState(0);

    // Fewer letters, faster progression to smaller sizes
    const snellenLetters = [
      { letter: "E", size: "text-[150px]" },
      { letter: "F", size: "text-[100px]" },
      { letter: "P", size: "text-[60px]" },
      { letter: "Z", size: "text-[40px]" },
      { letter: "D", size: "text-[20px]" }, // Smallest letter
    ];

    const handleCanRead = () => {
      if (currentSnellenIndex < snellenLetters.length - 1) {
        setCurrentSnellenIndex(prev => prev + 1);
        showSuccess("Good! Let's try a smaller one.");
      } else {
        // User read the smallest letter
        showSuccess("Excellent! You've completed the visual acuity test.");
        setVisualAcuityResult("good");
        setCurrentStep("astigmatism");
      }
    };

    const handleCannotRead = () => {
      showError("It seems you're having difficulty. This may indicate a need for vision correction.");
      setVisualAcuityResult("needs_check");
      setCurrentStep("astigmatism"); // Move to next test regardless
    };

    const currentLetter = snellenLetters[currentSnellenIndex];

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Visual Acuity Test</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Can you clearly read the letter below?
        </p>

        <div className="my-8">
          <SnellenChart letter={currentLetter.letter} sizeClass={currentLetter.size} />
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={handleCanRead}
            className="px-6 py-3 bg-green-600 text-white rounded-md text-lg hover:bg-green-700 transition-colors"
          >
            Yes, I can read it
          </button>
          <button
            onClick={handleCannotRead}
            className="px-6 py-3 bg-red-600 text-white rounded-md text-lg hover:bg-red-700 transition-colors"
          >
            No, I can't read it
          </button>
        </div>
        <MadeWithDyad />
      </div>
    );
  };

  const AstigmatismDialTest = () => {
    const handleLinesDifferent = () => {
      showError("It seems you might have astigmatism. Please consult an eye care professional.");
      setAstigmatismResult("possible");
      setCurrentStep("colorVision");
    };

    const handleLinesSame = () => {
      showSuccess("Great! Your astigmatism test indicates no significant issues.");
      setAstigmatismResult("none");
      setCurrentStep("colorVision");
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Astigmatism Dial Test</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Focus on the center. Do any lines appear darker or clearer than others?
        </p>
        <AstigmatismDial />
        <div className="flex space-x-4 mt-8">
          <button
            onClick={handleLinesDifferent}
            className="px-6 py-3 bg-red-600 text-white rounded-md text-lg hover:bg-red-700 transition-colors"
          >
            Yes, some lines are darker/clearer
          </button>
          <button
            onClick={handleLinesSame}
            className="px-6 py-3 bg-green-600 text-white rounded-md text-lg hover:bg-green-700 transition-colors"
          >
            No, all lines look the same
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

    // Ishihara plates data with increasing difficulty
    const ishiharaPlates = [
      { id: 1, correctAnswer: "29", numberForSvg: "29" }, // Medium
      { id: 2, correctAnswer: "74", numberForSvg: "74" }, // Medium
      { id: 3, correctAnswer: "5", numberForSvg: "5" },   // Harder
      { id: 4, correctAnswer: "15", numberForSvg: "15" }, // Very Hard
    ];

    const handleAnswerSubmit = () => {
      const currentPlate = ishiharaPlates[currentPlateIndex];
      if (inputValue.trim() === currentPlate.correctAnswer) {
        showSuccess("Correct! Moving to the next plate.");
      } else {
        showError(`Incorrect. The correct answer was ${currentPlate.correctAnswer}.`);
        setIncorrectAnswersCount(prev => prev + 1);
      }

      if (currentPlateIndex < ishiharaPlates.length - 1) {
        setCurrentPlateIndex(prev => prev + 1);
        setInputValue(""); // Clear input for next plate
      } else {
        // All plates completed
        if (incorrectAnswersCount > 1) { // If 2 or more incorrect answers out of 4 plates
          setColorVisionResult("possible_deficiency");
          showError("You've completed the color vision test with several incorrect answers.");
        } else {
          setColorVisionResult("normal");
          showSuccess("You've completed the color vision test!");
        }
        setCurrentStep("results");
      }
    };

    const currentPlate = ishiharaPlates[currentPlateIndex];

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Color Vision Test</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          What number do you see in the image below? (Plate {currentPlateIndex + 1} of {ishiharaPlates.length})
        </p>

        <IshiharaPlate
          plateNumber={currentPlate.id}
          onAnswerChange={setInputValue}
          inputValue={inputValue}
          correctAnswerForSvg={currentPlate.numberForSvg} // Pass the number for SVG
        />

        <button
          onClick={handleAnswerSubmit}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 transition-colors"
        >
          Submit Answer
        </button>
        <MadeWithDyad />
      </div>
    );
  };

  return (
    <>
      {currentStep === "disclaimer" && <Disclaimer onAgree={handleAgreeToDisclaimer} />}
      {currentStep === "calibration" && <Calibration />}
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