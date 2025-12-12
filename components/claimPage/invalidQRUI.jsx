import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function InvalidQRUI() {
  return (
    <div className="flex justify-center items-center h-screen bg-custom-gradient px-4">
      <Card className="w-full max-w-md border-red-200 shadow-md rounded-2xl">
        <CardContent className="py-10 flex flex-col items-center text-center gap-4">

          <div className="bg-red-100 p-4 rounded-full">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>

          <h2 className="text-xl font-semibold text-red-700">
            Invalid QR Code
          </h2>

          <p className="text-gray-600 max-w-xs leading-tight">
            This QR code doesn’t seem to be from a registered shop. <br/>
            <span className="font-medium text-red-700">
              Please scan a valid QR again.
            </span>
          </p>

        </CardContent>
      </Card>
    </div>
  );
}
