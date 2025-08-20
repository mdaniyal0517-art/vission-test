import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { CheckCircle, XCircle, Eye, Palette, Share2, Lightbulb } from "lucide-react";

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
  const [eyeTipUnlocked, setEyeTipUnlocked] = useState(false); // State to control eye tip visibility

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

  const getEyeTipContent = () => { // Renamed function for clarity
    const tips = [];
    if (visualAcuityResult === "needs_check") {
      tips.push("For visual acuity: Practice the '20-20-20 rule' – every 20 minutes, look at something 20 feet away for 20 seconds to reduce eye strain. Ensure good lighting when reading or working.");
    }
    if (astigmatismResult === "possible") {
      tips.push("For astigmatism: If you experience blurry vision or eye strain, especially at night, consider consulting an optometrist. Corrective lenses (glasses or contacts) are typically used to manage astigmatism.");
    }
    if (colorVisionResult === "possible_deficiency") {
      tips.push("For color vision: While color blindness cannot be cured, strategies like using color-coding, labels, and apps that help distinguish colors can be very helpful in daily life.");
    }
    if (tips.length === 0) {
      return "Maintain good eye health by eating a balanced diet rich in vitamins A, C, and E, and omega-3 fatty acids. Protect your eyes from UV light with sunglasses, and take regular breaks from screens.";
    }
    return tips.join(" ");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Eye Vision AI Self-Check',
        text: 'Check your vision with this free online tool!',
        url: window.location.href,
      })
      .then(() => {
        console.log('Successful share dialog opened');
        setEyeTipUnlocked(true); // Unlock tip if share dialog is successfully opened
      })
      .catch((error) => {
        console.log('Error sharing or user cancelled', error);
        // Do not unlock if share dialog was cancelled or failed
      });
    } else {
      // Fallback for browsers that do not support the Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert('Link copied to clipboard! Share this tool with your friends and family to unlock personalized eye tips.');
          setEyeTipUnlocked(true); // Unlock tip after copying to clipboard
        })
        .catch((err) => {
          console.error('Could not copy text: ', err);
          alert('Failed to copy link. Please try sharing manually.');
          // Do not unlock if copy failed
        });
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

          <Card className="p-4 bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 border-l-4">
            <CardTitle className="text-xl font-semibold mb-2 flex items-center text-blue-700 dark:text-blue-300">
              <Lightbulb className="mr-2" /> Eye Tip:
            </CardTitle>
            {eyeTipUnlocked ? (
              <p className="text-blue-800 dark:text-blue-200">{getEyeTipContent()}</p>
            ) : (
              <div className="text-center">
                <p className="text-blue-800 dark:text-blue-200 mb-4">
                  Share this tool with your friends to unlock personalized eye tips!
                </p>
                <Button onClick={handleShare} className="w-full max-w-xs bg-purple-600 hover:bg-purple-700 text-white">
                  <Share2 className="mr-2 h-4 w-4" /> Share with your friends
                </Button>
              </div>
            )}
          </Card>
        </CardContent>
        <div className="flex flex-col items-center p-6 space-y-4">
          <Button onClick={onRetakeTest} className="w-full max-w-xs">
            Retake Test
          </Button>
          {/* The main share button is now inside the Eye Tip card when locked, so it's removed from here. */}
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