import React from 'react';
import QRCode from 'qrcode.react'; // Changed from named import to default import
import { Card, CardContent } from "@/components/ui/card";

interface QRCodeDisplayProps {
  url: string;
  size?: number;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ url, size = 256 }) => {
  return (
    <Card className="p-4 flex flex-col items-center justify-center bg-white dark:bg-gray-700 shadow-md">
      <CardContent className="p-0">
        <QRCode
          value={url}
          size={size}
          level="H"
          includeMargin={false}
          renderAs="svg"
          className="rounded-md"
        />
      </CardContent>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 text-center">
        Scan this QR code to share the app!
      </p>
    </Card>
  );
};

export default QRCodeDisplay;