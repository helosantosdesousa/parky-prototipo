import { useNavigate, useLocation } from "react-router";
import { CheckCircle, Calendar, Clock, MapPin, CreditCard } from "lucide-react";

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { parking, hours, totalPrice } = location.state || {
    parking: { name: "Shopping Center Parking", address: "Av. Paulista, 1000" },
    hours: 2,
    totalPrice: 30,
  };

  const now = new Date();
  const endTime = new Date(now.getTime() + hours * 60 * 60 * 1000);

  return (
    <div className="size-full bg-gray-50 flex items-center justify-center p-4 md:p-6">
      <div className="max-w-md md:max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-green-100 rounded-full mb-3 md:mb-4">
            <CheckCircle className="w-10 h-10 md:w-14 md:h-14 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Reserva Confirmada!</h1>
          <p className="text-sm md:text-base text-gray-600">Sua vaga está garantida</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8 mb-6 md:grid md:grid-cols-2 md:gap-8">
          <div className="text-center mb-5 md:mb-0 pb-5 md:pb-0 border-b md:border-b-0 md:border-r border-gray-200 md:col-span-2 md:pb-6">
            <div className="text-3xl md:text-5xl font-bold text-indigo-600 mb-1">#{Math.floor(Math.random() * 10000)}</div>
            <div className="text-xs md:text-sm text-gray-600">Código da Reserva</div>
          </div>

          <div className="space-y-3 md:space-y-4 md:col-span-2">
            <div className="flex items-start gap-2 md:gap-3">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs md:text-sm text-gray-600">Estacionamento</p>
                <p className="font-semibold text-gray-900 text-sm md:text-base">{parking.name}</p>
                <p className="text-xs md:text-sm text-gray-600">{parking.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 md:gap-3">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs md:text-sm text-gray-600">Data</p>
                <p className="font-semibold text-gray-900 text-sm md:text-base">
                  {now.toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 md:gap-3">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs md:text-sm text-gray-600">Período</p>
                <p className="font-semibold text-gray-900 text-sm md:text-base">
                  {now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} - {endTime.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                </p>
                <p className="text-xs md:text-sm text-gray-600">{hours} {hours === 1 ? 'hora' : 'horas'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 md:space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
          <button
            onClick={() => navigate("/my-bookings")}
            className="w-full bg-indigo-600 text-white py-3 md:py-4 rounded-xl text-sm md:text-base font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
          >
            Ver Minhas Reservas
          </button>
          <button
            onClick={() => navigate("/home")}
            className="w-full bg-white text-gray-700 py-3 md:py-4 rounded-xl text-sm md:text-base font-semibold hover:bg-gray-50 transition-colors border border-gray-300"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
}
