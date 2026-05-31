import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, Camera, ScanLine } from "lucide-react";
import { useState } from "react";
import BottomNavigation from "../components/BottomNavigation";

export default function CheckIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { booking } = location.state || {};
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      navigate("/checkin/success", { state: { booking } });
    }, 2000);
  };

  return (
    <div className="size-full bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 px-4 py-3 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/my-bookings")}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-lg font-bold text-white">Check-in</h1>
        </div>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Simulated Camera */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>

        {/* Scan Frame */}
        <div className="relative z-10 w-64 h-64 md:w-80 md:h-80">
          <div className="absolute inset-0 border-2 border-white rounded-2xl opacity-50"></div>
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-indigo-500 rounded-tl-2xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-indigo-500 rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-indigo-500 rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-indigo-500 rounded-br-2xl"></div>

          {scanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-1 bg-indigo-500 animate-pulse"></div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="absolute bottom-32 left-0 right-0 text-center px-6">
          <ScanLine className="w-12 h-12 text-white mx-auto mb-3 opacity-80" />
          <p className="text-white text-lg mb-2">Escaneie o QR Code</p>
          <p className="text-gray-400 text-sm">
            Posicione o QR code dentro da área marcada
          </p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 bg-gray-900 pb-24">
        <button
          onClick={handleScan}
          disabled={scanning}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Camera className="w-5 h-5" />
          {scanning ? "Escaneando..." : "Simular Scan"}
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
}
