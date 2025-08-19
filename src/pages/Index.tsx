"use client";

import React, { useState, useRef, useEffect } from "react";
import Disclaimer from "@/components/Disclaimer";
import { MadeWithDyad } from "@/components/made-with-dyad";
import AstigmatismDial from "@/components/AstigmatismDial";
import SnellenChart from "@/components/SnellenChart";
import IshiharaPlate from "@/components/IshiharaPlate";
import { showSuccess, showError } from "@/utils/toast";

// Define the possible steps in our application flow
type AppStep = "disclaimer" | "calibration" | "visualAcuity" | "astigmatism" | "colorVision" | "results";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>("disclaimer");

  const handleAgreeToDisclaimer = () => {
    setCurrentStep("calibration");
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
          onClick={() => setCurrentStep("visualAcuity")}
          disabled={!cameraActive}
          className={`mt-8 px-6 py-3 rounded-md text-lg transition-colors ${
            cameraActive ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          {cameraActive ? "Proceed to Visual Acuity Test" : "Waiting for Camera..."}
        </button>
        <MadeWithDyad />
      </div>
    );
  };

  const VisualAcuityTest = () => {
    const [currentSnellenIndex, setCurrentSnellenIndex] = useState(0);

    const snellenLetters = [
      { letter: "E", size: "text-[200px]" },
      { letter: "F", size: "text-[150px]" },
      { letter: "P", size: "text-[100px]" },
      { letter: "T", size: "text-[80px]" },
      { letter: "O", size: "text-[60px]" },
      { letter: "Z", size: "text-[40px]" },
      { letter: "L", size: "text-[30px]" },
      { letter: "D", size: "text-[20px]" },
    ];

    const handleCanRead = () => {
      if (currentSnellenIndex < snellenLetters.length - 1) {
        setCurrentSnellenIndex(prev => prev + 1);
        showSuccess("Great! Let's try a smaller one.");
      } else {
        showSuccess("Excellent! You've completed the visual acuity test.");
        setCurrentStep("astigmatism");
      }
    };

    const handleCannotRead = () => {
      showError("It seems you're having difficulty. Please consult an eye care professional.");
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
      setCurrentStep("colorVision");
    };

    const handleLinesSame = () => {
      showSuccess("Great! Your astigmatism test indicates no significant issues.");
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

    // Ishihara plates data using the new SVG component
    const ishiharaPlates = [
      { id: 1, correctAnswer: "12", numberForSvg: "12" },
      { id: 2, correctAnswer: "8", numberForSvg: "8" },
      { id: 3, correctAnswer: "6", numberForSvg: "6" },
    ];

    const handleAnswerSubmit = () => {
      const currentPlate = ishiharaPlates[currentPlateIndex];
      if (inputValue.trim() === currentPlate.correctAnswer) {
        showSuccess("Correct! Moving to the next plate.");
        if (currentPlateIndex < ishiharaPlates.length - 1) {
          setCurrentPlateIndex(prev => prev + 1);
          setInputValue(""); // Clear input for next plate
        } else {
          showSuccess("You've completed the color vision test!");
          setCurrentStep("results");
        }
      } else {
        showError(`Incorrect. The correct answer was ${currentPlate.correctAnswer}.`);
        // Optionally, you could allow retries or move to the next plate/results
        if (currentPlateIndex < ishiharaPlates.length - 1) {
          setCurrentPlateIndex(prev => prev + 1);
          setInputValue("");
        } else {
          showError("You've completed the color vision test with some incorrect answers.");
          setCurrentStep("results");
        }
      }
    };

    const currentPlate = ishiharaPlates[currentPlateIndex];

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Color Vision Test</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          What number do you see in the image below?
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

  const Results = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Your Vision Check Results</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        This is where the AI analysis and conclusion will be displayed.
      </p>
      <MadeWithDyad />
    </div>
  );

  return (
    <>
      {currentStep === "disclaimer" && <Disclaimer onAgree={handleAgreeToDisclaimer} />}
      {currentStep === "calibration" && <Calibration />}
      {currentStep === "visualAcuity" && <VisualAcuityTest />}
      {currentStep === "astigmatism" && <AstigmatismDialTest />}
      {currentStep === "colorVision" && <ColorVisionTest />}
      {currentStep === "results" && <Results />}
    </>
  );
};

export default Index;