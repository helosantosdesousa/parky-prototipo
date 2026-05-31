import { useNavigate } from "react-router";
import { Search, User, Clock, MapPin, Calendar } from "lucide-react";
import BottomNavigation from "../components/BottomNavigation";

export default function NewHome() {
  const navigate = useNavigate();
  const userName = "João";

  // Simulando ticket ativo
  const activeTicket = {
    parkingName: "Estacionamento Central",
    address: "Rua Augusta, 450",
    startTime: "14:30",
    elapsedTime: "00:45:12",
  };

  // Simulando reservas futuras
  const upcomingReservations = [
    {
      id: 1,
      parkingName: "Shopping Center",
      date: "Hoje",
      time: "18:00",
      area: "Área 2.1",
    },
    {
      id: 2,
      parkingName: "Parking Tower",
      date: "Amanhã",
      time: "09:00",
      area: "Área 2.3",
    },
  ];

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header com saudação e perfil */}
      <div className="bg-[#1e40af] px-6 py-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-200 text-sm">Olá,</p>
            <h1 className="text-white text-2xl font-bold">{userName}</h1>
          </div>
          <button
            onClick={() => navigate("/profile")}
            className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
          >
            <User className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar estacionamento por nome ou endereço"
            className="w-full pl-12 pr-4 py-3 text-sm bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 -mt-4 pb-24">
        {/* Active Ticket Card */}
        {activeTicket && (
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-5 mb-6 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-green-100 text-xs font-medium mb-1">VOCÊ ESTÁ ESTACIONADO</p>
                <h3 className="text-white font-bold text-lg mb-1">{activeTicket.parkingName}</h3>
                <p className="text-green-100 text-sm">{activeTicket.address}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Clock className="w-5 h-5 text-white mb-1" />
                <p className="text-white font-mono text-sm font-bold">{activeTicket.elapsedTime}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigate("/checkout")}
                className="flex-1 bg-white text-green-600 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors"
              >
                Fazer Checkout
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-4 rounded-xl hover:bg-white/30 transition-colors">
                Detalhes
              </button>
            </div>
          </div>
        )}

        {/* Upcoming Reservations */}
        <div className="mb-6">
          <h2 className="font-bold text-gray-900 text-lg mb-3">Próximas Reservas</h2>

          {upcomingReservations.length > 0 ? (
            <div className="space-y-3">
              {upcomingReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{reservation.parkingName}</h3>
                      <p className="text-sm text-gray-600 mt-1">{reservation.area}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{reservation.date}</p>
                      <p className="text-sm font-bold text-blue-600">{reservation.time}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate("/checkin")}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Check-in
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      Ver QR Code
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 mb-4">
                Você não tem reservas para hoje. Que tal buscar um local?
              </p>
              <button
                onClick={() => navigate("/locals")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Explorar Locais
              </button>
            </div>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
