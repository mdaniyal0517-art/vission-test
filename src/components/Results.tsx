import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { CheckCircle, XCircle, Eye, Palette, Share2, QrCode } from "lucide-react"; // Import icons
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"; // Import Dialog components and DialogDescription
import QRCodeDisplay from "./QRCodeDisplay"; // Import the new QR code component

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
        return {
          icon: <CheckCircle className="text-green-500 mr-2" />,
          text: "Visual Acuity: You were able to read the smallest letters, indicating good visual acuity for this self-assessment.",
        };
      case "needs_check":
        return {
          icon: <XCircle className="text-red-500 mr-2" />,
          text: "Visual Acuity: You had difficulty reading smaller letters, which may suggest a need for vision correction.",
        };
      default:
        return {
          icon: <Eye className="text-gray-500 mr-2" />,
          text: "Visual Acuity: Test not completed or result inconclusive.",
        };
    }
  };

  const getAstigmatismSummary = () => {
    switch (astigmatismResult) {
      case "none":
        return {
          icon: <CheckCircle className="text-green-500 mr-2" />,
          text: "Astigmatism: All lines on the dial appeared equally clear, suggesting no significant astigmatism based on this test.",
        };
      case "possible":
        return {
          icon: <XCircle className="text-red-500 mr-2" />,
          text: "Astigmatism: Some lines on the dial appeared darker or clearer, which could indicate astigmatism.",
        };
      default:
        return {
          icon: <Eye className="text-gray-500 mr-2" />,
          text: "Astigmatism: Test not completed or result inconclusive.",
        };
    }
  };

  const getColorVisionSummary = () => {
    switch (colorVisionResult) {
      case "normal":
        return {
          icon: <CheckCircle className="text-green-500 mr-2" />,
          text: "Color Vision: You correctly identified the numbers on the Ishihara plates, suggesting normal color vision.",
        };
      case "possible_deficiency":
        return {
          icon: <XCircle className="text-red-500 mr-2" />,
          text: "Color Vision: You had difficulty identifying numbers on some Ishihara plates, which may indicate a color vision deficiency.",
        };
      default:
        return {
          icon: <Palette className="text-gray-500 mr-2" />,
          text: "Color Vision: Test not completed or result inconclusive.",
        };
    }
  };

  const getAiObservation = () => {
    const observations = [];
    if (visualAcuityResult === "needs_check") {
      observations.push("The visual acuity self-assessment indicated challenges in discerning smaller text, which often suggests a need for corrective lenses to improve distant vision clarity.");
    }
    if (astigmatismResult === "possible") {
      observations.push("During the astigmatism test, certain radial lines appeared more distinct or blurred than others, which is a common indicator of astigmatism.");
    }
    if (colorVisionResult === "possible_deficiency") {
      observations.push("Your responses to the Ishihara plates suggest a potential difficulty in distinguishing certain colors, consistent with a possible color vision deficiency.");
    }

    if (observations.length === 0) {
      return "Based on the completed tests, your self-assessment indicates generally good visual performance across acuity, astigmatism, and color perception. No significant anomalies were detected within the scope of this preliminary evaluation.";
    }
    return "Based on your self-assessment results: " + observations.join(" ");
  };

  const getRecommendation = () => {
    if (needsSpecialist) {
      return "Based on your self-assessment, it is highly recommended to consult an eye care specialist for a comprehensive examination. This tool is for preliminary self-assessment only and cannot provide a diagnosis or prescription.";
    }
    return "Your self-assessment indicates generally good vision. However, this tool is for preliminary self-assessment only and is not a substitute for a professional eye examination. Regular eye check-ups are recommended.";
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Eye Vision AI Self-Check',
        text: 'Check your vision with this free online tool!',
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that do not support the Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard! Share this tool with your friends and family.'))
        .catch((err) => console.error('Could not copy text: ', err));
    }
  };

  const acuitySummary = getAcuitySummary();
  const astigmatismSummary = getAstigmatismSummary();
  const colorVisionSummary = getColorVisionSummary();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
      <Card className="w-full max-w-2xl shadow-lg mb-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800 dark:text-gray-100">Your Vision Check Results</CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
            Summary of your self-assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700 dark:text-gray-300">
          <Card className="p-4 bg-gray-50 dark:bg-gray-700">
            <CardTitle className="text-xl font-semibold mb-2 flex items-center">
              <Eye className="mr-2" /> Test Summaries:
            </CardTitle>
            <p className="flex items-start">{acuitySummary.icon}{acuitySummary.text}</p>
            <p className="flex items-start">{astigmatismSummary.icon}{astigmatismSummary.text}</p>
            <p className="flex items-start">{colorVisionSummary.icon}{colorVisionSummary.text}</p>
          </Card>

          <Card className="p-4 bg-gray-50 dark:bg-gray-700">
            <CardTitle className="text-xl font-semibold mb-2 flex items-center">
              <Share2 className="mr-2" /> AI Observation:
            </CardTitle>
            <p>{getAiObservation()}</p>
          </Card>

          <Card className={`p-4 ${needsSpecialist ? "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700" : "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700"} border-l-4`}>
            <CardTitle className="text-xl font-semibold mb-2 flex items-center">
              Recommendation:
            </CardTitle>
            <p className={needsSpecialist ? "text-red-700 dark:text-red-300 font-bold" : "text-green-700 dark:text-green-300 font-bold"}>
              {getRecommendation()}
            </p>
          </Card>
        </CardContent>
        <div className="flex flex-col items-center p-6 space-y-4">
          <Button onClick={onRetakeTest} className="w-full max-w-xs">
            Retake Test
          </Button>
          <Button onClick={handleShare} className="w-full max-w-xs bg-purple-600 hover:bg-purple-700 text-white">
            <Share2 className="mr-2 h-4 w-4" /> Share on Social Media
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full max-w-xs bg-gray-600 hover:bg-gray-700 text-white">
                <QrCode className="mr-2 h-4 w-4" /> Show QR Code
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-6">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-bold">Share with QR Code</DialogTitle>
                <DialogDescription className="text-center">
                  Scan this code with your phone to open the app.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center py-4">
                <QRCodeDisplay url={window.location.href} size={200} />
              </div>
            </DialogContent>
          </Dialog>

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
            Help others check their vision too!
          </p>
        </div>
      </Card>
      <MadeWithDyad />
    </div>
  );
};

export default Results;