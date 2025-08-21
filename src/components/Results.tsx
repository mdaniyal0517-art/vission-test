import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { CheckCircle, XCircle, Eye, Palette, Share2, Lightbulb } from "lucide-react";
import { useTranslation } from 'react-i18next'; // Import useTranslation

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
  const [eyeTipUnlocked, setEyeTipUnlocked] = useState(false);
  const { t } = useTranslation(); // Initialize useTranslation

  const needsSpecialist =
    visualAcuityResult === "needs_check" ||
    astigmatismResult === "possible" ||
    colorVisionResult === "possible_deficiency";

  const getAcuitySummary = () => {
    switch (visualAcuityResult) {
      case "good":
        return {
          icon: <CheckCircle className="text-green-500 mr-2" />,
          text: t("visual_acuity_good"),
        };
      case "needs_check":
        return {
          icon: <XCircle className="text-red-500 mr-2" />,
          text: t("visual_acuity_needs_check"),
        };
      default:
        return {
          icon: <Eye className="text-gray-500 mr-2" />,
          text: t("visual_acuity_inconclusive"),
        };
    }
  };

  const getAstigmatismSummary = () => {
    switch (astigmatismResult) {
      case "none":
        return {
          icon: <CheckCircle className="text-green-500 mr-2" />,
          text: t("astigmatism_none"),
        };
      case "possible":
        return {
          icon: <XCircle className="text-red-500 mr-2" />,
          text: t("astigmatism_possible"),
        };
      default:
        return {
          icon: <Eye className="text-gray-500 mr-2" />,
          text: t("astigmatism_inconclusive"),
        };
    }
  };

  const getColorVisionSummary = () => {
    switch (colorVisionResult) {
      case "normal":
        return {
          icon: <CheckCircle className="text-green-500 mr-2" />,
          text: t("color_vision_normal"),
        };
      case "possible_deficiency":
        return {
          icon: <XCircle className="text-red-500 mr-2" />,
          text: t("color_vision_possible_deficiency"),
        };
      default:
        return {
          icon: <Palette className="text-gray-500 mr-2" />,
          text: t("color_vision_inconclusive"),
        };
    }
  };

  const getAiObservation = () => {
    const observations = [];
    if (visualAcuityResult === "needs_check") {
      observations.push(t("ai_observation_needs_check_acuity"));
    }
    if (astigmatismResult === "possible") {
      observations.push(t("ai_observation_possible_astigmatism"));
    }
    if (colorVisionResult === "possible_deficiency") {
      observations.push(t("ai_observation_possible_color_deficiency"));
    }

    if (observations.length === 0) {
      return t("ai_observation_good");
    }
    return t("ai_observation") + " " + observations.join(" ");
  };

  const getRecommendation = () => {
    if (needsSpecialist) {
      return t("recommendation_specialist");
    }
    return t("recommendation_good_vision");
  };

  const getEyeTipContent = () => {
    const tips = [];
    if (visualAcuityResult === "needs_check") {
      tips.push(t("eye_tip_acuity"));
    }
    if (astigmatismResult === "possible") {
      tips.push(t("eye_tip_astigmatism"));
    }
    if (colorVisionResult === "possible_deficiency") {
      tips.push(t("eye_tip_color_vision"));
    }
    if (tips.length === 0) {
      return t("eye_tip_general");
    }
    return tips.join(" ");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: t('welcome_title'),
        text: t('help_others_check_vision'),
        url: window.location.href,
      })
      .then(() => {
        console.log('Successful share dialog opened');
        setEyeTipUnlocked(true);
      })
      .catch((error) => {
        console.log('Error sharing or user cancelled', error);
      });
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert(t('eye_tip_share_prompt'));
          setEyeTipUnlocked(true);
        })
        .catch((err) => {
          console.error('Could not copy text: ', err);
          alert(t('failed_to_access_camera_toast')); // Reusing a toast message for simplicity
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
          <CardTitle className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('your_vision_check_results')}</CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
            {t('summary_of_self_assessment')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700 dark:text-gray-300">
          <Card className="p-4 bg-gray-50 dark:bg-gray-700">
            <CardTitle className="text-xl font-semibold mb-2 flex items-center">
              <Eye className="mr-2" /> {t('test_summaries')}
            </CardTitle>
            <p className="flex items-start">{acuitySummary.icon}{acuitySummary.text}</p>
            <p className="flex items-start">{astigmatismSummary.icon}{astigmatismSummary.text}</p>
            <p className="flex items-start">{colorVisionSummary.icon}{colorVisionSummary.text}</p>
          </Card>

          <Card className="p-4 bg-gray-50 dark:bg-gray-700">
            <CardTitle className="text-xl font-semibold mb-2 flex items-center">
              <Share2 className="mr-2" /> {t('ai_observation')}
            </CardTitle>
            <p>{getAiObservation()}</p>
          </Card>

          <Card className={`p-4 ${needsSpecialist ? "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700" : "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700"} border-l-4`}>
            <CardTitle className="text-xl font-semibold mb-2 flex items-center">
              {t('recommendation')}:
            </CardTitle>
            <p className={needsSpecialist ? "text-red-700 dark:text-red-300 font-bold" : "text-green-700 dark:text-green-300 font-bold"}>
              {getRecommendation()}
            </p>
          </Card>

          <Card className="p-4 bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 border-l-4">
            <CardTitle className="text-xl font-semibold mb-2 flex items-center text-blue-700 dark:text-blue-300">
              <Lightbulb className="mr-2" /> {t('eye_tip')}:
            </CardTitle>
            {eyeTipUnlocked ? (
              <p className="text-blue-800 dark:text-blue-200">{getEyeTipContent()}</p>
            ) : (
              <div className="text-center">
                <p className="text-blue-800 dark:text-blue-200 mb-4">
                  {t('eye_tip_share_prompt')}
                </p>
                <Button onClick={handleShare} className="w-full max-w-xs bg-purple-600 hover:bg-purple-700 text-white">
                  <Share2 className="mr-2 h-4 w-4" /> {t('share_with_friends_button')}
                </Button>
              </div>
            )}
          </Card>
        </CardContent>
        <div className="flex flex-col items-center p-6 space-y-4">
          <Button onClick={onRetakeTest} className="w-full max-w-xs">
            {t('retake_test_button')}
          </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
            {t('help_others_check_vision')}
          </p>
        </div>
      </Card>
      <MadeWithDyad />
    </div>
  );
};

export default Results;