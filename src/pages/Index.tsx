"use client";

import React, { useState } from "react";
import Disclaimer from "@/components/Disclaimer";
import { MadeWithDyad } from "@/components/made-with-dyad";
import AstigmatismDial from "@/components/AstigmatismDial"; // Import the new component

// Define the possible steps in our application flow
type AppStep = "disclaimer" | "calibration" | "visualAcuity" | "astigmatism" | "colorVision" | "results";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>("disclaimer");

  const handleAgreeToDisclaimer = () => {
    setCurrentStep("calibration");
  };

  // Placeholder for Calibration component (will be created next)
  const Calibration = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Calibration Step</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        This is where we'll ask you to hold a credit card/coin for scale and estimate distance.
      </p>
      <button 
        onClick={() => setCurrentStep("visualAcuity")} 
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 transition-colors"
      >
        Proceed to Visual Acuity Test (Placeholder)
      </button>
      <MadeWithDyad />
    </div>
  );

  // Placeholder for other test components
  const VisualAcuityTest = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Visual Acuity Test</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        This will be the Snellen-like chart.
      </p>
      <button 
        onClick={() => setCurrentStep("astigmatism")} 
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 transition-colors"
      >
        Proceed to Astigmatism Test (Placeholder)
      </button>
      <MadeWithDyad />
    </div>
  );

  const AstigmatismDialTest = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Astigmatism Dial Test</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Focus on the center. Do any lines appear darker or clearer than others?
      </p>
      <AstigmatismDial /> {/* Use the new AstigmatismDial component */}
      <button 
        onClick={() => setCurrentStep("colorVision")} 
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 transition-colors"
      >
        Proceed to Color Vision Test (Placeholder)
      </button>
      <MadeWithDyad />
    </div>
  );

  const ColorVisionTest = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Color Vision Test</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        This will show Ishihara plates.
      </p>
      <button 
        onClick={() => setCurrentStep("results")} 
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 transition-colors"
      >
        View Results (Placeholder)
      </button>
      <MadeWithDyad />
    </div>
  );

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