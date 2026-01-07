'use client'

import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function InvalidQRUI() {
  return (
    <div className="flex justify-center items-center h-screen bg-custom-gradient px-4">
      <Card className="w-full max-w-md border-error-border shadow-md rounded-2xl">
        <CardContent className="py-10 flex flex-col items-center text-center gap-4">

          <div className="bg-error-bg-primary p-4 rounded-full">
            <AlertTriangle className="h-10 w-10 text-error-text-1" />
          </div>

          <h2 className="text-xl font-semibold text-error-text-2">
            Invalid QR Code
          </h2>

          <p className="text-gray-600 max-w-xs leading-tight">
            This QR code doesn’t seem to be from a registered shop. <br />
            <span className="font-medium text-error-text-2">
              Please scan a valid QR again.
            </span>
          </p>

        </CardContent>
      </Card>
    </div>
  );
}
