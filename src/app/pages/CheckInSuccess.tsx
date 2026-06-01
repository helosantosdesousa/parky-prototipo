import { useNavigate, useLocation } from "react-router";
import { CheckCircle, Clock, LogOut, Plus } from "lucide-react";
import { useState } from "react";
import BottomNavigation from "../components/BottomNavigation";

export default function CheckInSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { booking } = location.state || {};
  const [timeRemaining, setTimeRemaining] = useState("1h 45min");

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleExtendTime = () => {
    // Simular extensão de tempo
    alert("Tempo estendido com sucesso!");
  };

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Success Section */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 px-6 py-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Check-in Realizado!</h1>
        <p className="text-green-100">Sua vaga está ativa</p>
      </div>

      {/* Timer Card */}
      <div className="px-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-2">Tempo Restante</p>
            <div className="text-5xl font-bold text-indigo-600 mb-1">{timeRemaining}</div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Expira às 16:45</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-indigo-600 rounded-full" style={{ width: "60%" }}></div>
          </div>

          {/* Parking Info */}
          {booking && (
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600">Estacionamento</p>
              <p className="font-semibold text-gray-900">{booking.parking}</p>
              <p className="text-sm text-gray-600 mt-1">{booking.address}</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex-1 px-6 py-6 space-y-3">
        <button
          onClick={handleExtendTime}
          className="w-full bg-white border-2 border-indigo-600 text-indigo-600 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Aumentar Tempo
        </button>

        <button
          onClick={handleCheckout}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Fazer Check-out
        </button>

        <button
          onClick={() => navigate("/home")}
          className="w-full text-gray-600 py-3 rounded-xl font-medium hover:text-gray-900 transition-colors"
        >
          Voltar ao Início
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
}
