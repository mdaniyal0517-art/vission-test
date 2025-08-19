"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface DisclaimerProps {
  onAgree: () => void;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ onAgree }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Important Disclaimer</CardTitle>
          <CardDescription className="text-center">Please read carefully before proceeding.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            This tool is designed for preliminary self-assessment of vision only.
            It is not a substitute for a professional eye examination by a qualified optometrist or ophthalmologist.
          </p>
          <p>
            The results provided by this tool are for informational purposes only and cannot give you an official glasses prescription.
            For an accurate diagnosis, treatment, or an official prescription, please consult an eye care professional.
          </p>
          <p>
            By proceeding, you acknowledge and agree that this tool is for self-check purposes only and you will seek professional medical advice for any vision concerns.
          </p>
          <div className="flex items-center space-x-2 mt-6">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(!!checked)}
            />
            <Label htmlFor="agree" className="text-base font-medium">
              I understand and agree to the terms.
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={onAgree} disabled={!agreed} className="w-full">
            Start Vision Check
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Disclaimer;