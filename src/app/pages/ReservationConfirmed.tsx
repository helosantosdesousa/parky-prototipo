import { useNavigate, useLocation } from "react-router";
import { CheckCircle, Calendar as CalendarIcon, Home, MapPin, Clock, AlertTriangle } from "lucide-react";
import BottomNavigation from "../components/BottomNavigation";

export default function ReservationConfirmed() {
  const navigate = useNavigate();
  const location = useLocation();
  const { parking, hours, totalPrice, selectedDate, selectedTime, selectedArea } = location.state || {};

  const handleAddToCalendar = () => {
    alert("Funcionalidade de adicionar à agenda será implementada!");
  };

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Success Header */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 px-6 py-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Reserva Confirmada com Sucesso!</h1>
        <p className="text-green-100">Seu estacionamento está garantido</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 -mt-8 pb-32">
        {/* Reservation Summary Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-6 pb-6 border-b border-gray-200">
            <div className="text-4xl font-bold text-blue-600 mb-1">
              #{Math.floor(Math.random() * 10000)}
            </div>
            <div className="text-sm text-gray-600">Código da Reserva</div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Estacionamento</p>
                <p className="font-semibold text-gray-900">{parking?.name || "Shopping Center"}</p>
                <p className="text-sm text-gray-600">{parking?.address || "Av. Paulista, 1000"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Área Selecionada</p>
                <p className="font-semibold text-gray-900">Área {selectedArea || "2.2"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarIcon className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Data e Hora</p>
                <p className="font-semibold text-gray-900">
                  {selectedDate
                    ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })
                    : '27 de maio de 2026'}
                </p>
                <p className="text-sm text-gray-600">{selectedTime || '09:00'} - {hours || 2}h de duração</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Valor Total</p>
                <p className="text-2xl font-bold text-blue-600">R$ {totalPrice || 30}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Card - 15 minutes */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl p-5 mb-6 shadow-lg">
          <div className="flex gap-3">
            <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-orange-900 mb-2 text-lg">⚠️ Atenção Importante</h3>
              <p className="text-sm text-orange-800 leading-relaxed">
                Lembre-se de fazer o check-in até, no máximo, <strong>15 minutos depois do horário agendado</strong> para não perder sua reserva.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleAddToCalendar}
            className="w-full bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <CalendarIcon className="w-5 h-5" />
            🗓️ Adicionar à minha Agenda
          </button>

          <button
            onClick={() => navigate("/home")}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Ir para a Página Inicial
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
