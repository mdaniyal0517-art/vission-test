import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";

interface ResultsProps {
  visualAcuityResult: "good" | "needs_check" | null;
  astigmatismResult: "none" | "possible" | null;
  colorVisionResult: "normal" | "possible_deficiency" | null;
  onRetakeTest: () => void;
}

const Results: React.FC<ResultsProps> = ({
  visualAcuityResult,
  astigmatismResult,
  colorVisionResult,
  onRetakeTest,
}) => {
  const needsSpecialist =
    visualAcuityResult === "needs_check" ||
    astigmatismResult === "possible" ||
    colorVisionResult === "possible_deficiency";

  const getAcuitySummary = () => {
    switch (visualAcuityResult) {
      case "good":
        return "Visual Acuity: You were able to read the smallest letters, indicating good visual acuity for this self-assessment.";
      case "needs_check":
        return "Visual Acuity: You had difficulty reading smaller letters, which may suggest a need for vision correction.";
      default:
        return "Visual Acuity: Test not completed or result inconclusive.";
    }
  };

  const getAstigmatismSummary = () => {
    switch (astigmatismResult) {
      case "none":
        return "Astigmatism: All lines on the dial appeared equally clear, suggesting no significant astigmatism based on this test.";
      case "possible":
        return "Astigmatism: Some lines on the dial appeared darker or clearer, which could indicate astigmatism.";
      default:
        return "Astigmatism: Test not completed or result inconclusive.";
    }
  };

  const getColorVisionSummary = () => {
    switch (colorVisionResult) {
      case "normal":
        return "Color Vision: You correctly identified the numbers on the Ishihara plates, suggesting normal color vision.";
      case "possible_deficiency":
        return "Color Vision: You had difficulty identifying numbers on some Ishihara plates, which may indicate a color vision deficiency.";
      default:
        return "Color Vision: Test not completed or result inconclusive.";
    }
  };

  const getAiObservation = () => {
    const observations = [];
    if (visualAcuityResult === "needs_check") {
      observations.push("Your visual acuity self-assessment suggests potential difficulty with distant vision.");
    }
    if (astigmatismResult === "possible") {
      observations.push("The astigmatism test indicated a possible presence of astigmatism.");
    }
    if (colorVisionResult === "possible_deficiency") {
      observations.push("Your color vision test results suggest a possible color vision deficiency.");
    }

    if (observations.length === 0) {
      return "Based on the completed tests, your self-assessment indicates generally good vision across the tested areas.";
    }
    return observations.join(" ");
  };

  const getRecommendation = () => {
    if (needsSpecialist) {
      return "Based on your self-assessment, it is highly recommended to consult an eye care specialist for a comprehensive examination. This tool is for preliminary self-assessment only and cannot provide a diagnosis or prescription.";
    }
    return "Your self-assessment indicates generally good vision. However, this tool is for preliminary self-assessment only and is not a substitute for a professional eye examination. Regular eye check-ups are recommended.";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800 dark:text-gray-100">Your Vision Check Results</CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
            Summary of your self-assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700 dark:text-gray-300">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Test Summaries:</h3>
            <p>{getAcuitySummary()}</p>
            <p>{getAstigmatismSummary()}</p>
            <p>{getColorVisionSummary()}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">AI Observation:</h3>
            <p>{getAiObservation()}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Recommendation:</h3>
            <p className={needsSpecialist ? "text-red-600 dark:text-red-400 font-bold" : "text-green-600 dark:text-green-400 font-bold"}>
              {getRecommendation()}
            </p>
          </div>
        </CardContent>
        <div className="flex justify-center p-6">
          <Button onClick={onRetakeTest} className="w-full max-w-xs">
            Retake Test
          </Button>
        </div>
      </Card>
      <MadeWithDyad />
    </div>
  );
};

export default Results;