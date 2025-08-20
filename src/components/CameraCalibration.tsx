"use client";

import React, { useRef, useEffect, useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showError } from "@/utils/toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera } from "lucide-react";

interface CameraCalibrationProps {
  onProceed: () => void;
}

const CameraCalibration: React.FC<CameraCalibrationProps> = ({ onProceed }) => {
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
      <Card className="w-full max-w-lg shadow-lg text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            <Camera className="inline-block mr-2 h-6 w-6" />
            Camera Access for Vision Check
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Please grant camera permission to proceed. This helps ensure you're ready for the tests.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700 dark:text-gray-300">
          <div className="w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg relative mx-auto">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto object-cover"></video>
            {!cameraActive && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl">
                Waiting for camera access...
              </div>
            )}
          </div>
          <Button
            onClick={onProceed}
            disabled={!cameraActive}
            className="w-full"
          >
            {cameraActive ? "Proceed to Distance Calibration" : "Waiting for Camera..."}
          </Button>
        </CardContent>
      </Card>
      <MadeWithDyad />
    </div>
  );
};

export default CameraCalibration;