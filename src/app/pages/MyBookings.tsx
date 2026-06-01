import { useNavigate } from "react-router";
import { ArrowLeft, MapPin, Clock, Calendar, MoreVertical } from "lucide-react";
import BottomNavigation from "../components/BottomNavigation";

const bookings = [
  {
    id: 1,
    code: "7834",
    parking: "Shopping Center Parking",
    address: "Av. Paulista, 1000",
    date: "19 de maio de 2026",
    time: "14:00 - 16:00",
    hours: 2,
    price: 30,
    status: "active",
  },
  {
    id: 2,
    code: "6291",
    parking: "Parking Tower",
    address: "Av. Rebouças, 2200",
    date: "18 de maio de 2026",
    time: "09:00 - 13:00",
    hours: 4,
    price: 72,
    status: "completed",
  },
  {
    id: 3,
    code: "5478",
    parking: "Estacionamento Central",
    address: "Rua Augusta, 450",
    date: "15 de maio de 2026",
    time: "18:30 - 21:30",
    hours: 3,
    price: 36,
    status: "completed",
  },
];

export default function MyBookings() {
  const navigate = useNavigate();

  return (
    <div className="size-full bg-gray-50 flex justify-center">
      <div className="w-full max-w-6xl flex flex-col">
        {/* Header */}
        <div className="bg-white px-4 md:px-8 py-3 md:py-4 shadow-sm">
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => navigate("/home")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-900" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Minhas Reservas</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white px-4 md:px-8 py-2 md:py-3 border-b border-gray-200">
          <div className="flex gap-4 md:gap-6">
            <button className="pb-2 text-sm md:text-base font-semibold text-indigo-600 border-b-2 border-indigo-600">
              Todas
            </button>
            <button className="pb-2 text-sm md:text-base text-gray-600 hover:text-gray-900">
              Ativas
            </button>
            <button className="pb-2 text-sm md:text-base text-gray-600 hover:text-gray-900">
              Concluídas
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="flex-1 overflow-auto px-4 md:px-8 py-4 md:py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs md:text-sm font-medium text-gray-600">#{booking.code}</span>
                      <span
                        className={`text-xs px-2 py-0.5 md:py-1 rounded-full ${
                          booking.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {booking.status === "active" ? "Ativa" : "Concluída"}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">{booking.parking}</h3>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{booking.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                    <Clock className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{booking.time} ({booking.hours}h)</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="text-base md:text-lg font-bold text-indigo-600">R$ {booking.price}</span>
                  {booking.status === "active" && (
                    <button
                      onClick={() => navigate("/checkin", { state: { booking } })}
                      className="px-3 md:px-4 py-1.5 md:py-2 bg-indigo-600 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Check-in
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Button */}
        <div className="p-4 md:p-6 bg-white border-t border-gray-200 pb-20 md:pb-6">
          <button
            onClick={() => navigate("/home")}
            className="w-full max-w-md mx-auto block bg-indigo-600 text-white py-3 md:py-4 rounded-xl text-sm md:text-base font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
          >
            Fazer Nova Reserva
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
