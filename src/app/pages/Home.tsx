import { useNavigate } from "react-router";
import { Search, MapPin, Navigation, Ticket, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import BottomNavigation from "../components/BottomNavigation";
import { useState } from "react";

const parkings = [
  {
    id: 1,
    spotNumber: "A1",
    name: "Shopping Center",
    address: "Av. Paulista, 1000",
    distance: "0.5 km",
    price: 15,
    availableSpots: 23,
    totalSpots: 50,
    status: "livre" as const,
  },
  {
    id: 2,
    spotNumber: "B3",
    name: "Estacionamento Central",
    address: "Rua Augusta, 450",
    distance: "1.2 km",
    price: 12,
    availableSpots: 8,
    totalSpots: 30,
    status: "livre" as const,
  },
  {
    id: 3,
    spotNumber: "C5",
    name: "Parking Tower",
    address: "Av. Rebouças, 2200",
    distance: "2.1 km",
    price: 18,
    availableSpots: 45,
    totalSpots: 100,
    status: "livre" as const,
  },
];

const totalAvailable = parkings.reduce((sum, p) => sum + p.availableSpots, 0);
const totalOccupied = parkings.reduce((sum, p) => sum + (p.totalSpots - p.availableSpots), 0);
const minPrice = Math.min(...parkings.map(p => p.price));

export default function Home() {
  const navigate = useNavigate();
  const [selectedParking, setSelectedParking] = useState<number | null>(null);

  return (
    <div className="size-full bg-gray-50 flex flex-col md:flex-row">
      {/* Left Panel - Map (Desktop) / Top (Mobile) */}
      <div className="md:flex-1 md:flex md:flex-col">
        {/* Header com cor da marca */}
        <div className="bg-[#1e40af] px-4 md:px-6 py-4 md:py-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-200 text-sm">Olá, João!</p>
              <h1 className="text-white text-xl md:text-2xl font-bold">Encontre sua vaga</h1>
            </div>
            <button
              onClick={() => navigate("/my-bookings")}
              className="p-2 bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors"
            >
              <Ticket className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
          </div>

          {/* Search Bar integrado */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-blue-300" />
            <input
              type="text"
              placeholder="Buscar estacionamento..."
              className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 text-sm md:text-base bg-blue-800 text-white placeholder-blue-300 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="bg-white px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <div className="bg-green-50 rounded-lg p-2 md:p-3">
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
                <span className="text-xs md:text-sm text-green-600 font-medium">Livres</span>
              </div>
              <p className="text-lg md:text-2xl font-bold text-green-700">{totalAvailable}</p>
            </div>

            <div className="bg-red-50 rounded-lg p-2 md:p-3">
              <div className="flex items-center gap-1 mb-1">
                <TrendingDown className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
                <span className="text-xs md:text-sm text-red-600 font-medium">Ocupadas</span>
              </div>
              <p className="text-lg md:text-2xl font-bold text-red-700">{totalOccupied}</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-2 md:p-3">
              <div className="flex items-center gap-1 mb-1">
                <DollarSign className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                <span className="text-xs md:text-sm text-blue-600 font-medium">A partir</span>
              </div>
              <p className="text-lg md:text-2xl font-bold text-blue-700">R${minPrice}</p>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="relative h-48 md:flex-1 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
          <div className="absolute top-3 md:top-4 right-3 md:right-4">
            <button className="bg-white p-2 md:p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
              <Navigation className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </button>
          </div>
          <div className="text-center">
            <MapPin className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mx-auto mb-2" />
            <p className="text-xs md:text-sm text-gray-600">Mapa de Estacionamentos</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Parking List com hierarquia clara */}
      <div className="flex-1 md:w-96 lg:w-[28rem] overflow-auto px-4 md:px-6 py-4 pb-20 md:pb-4 md:bg-white md:border-l md:border-gray-200">
        <h2 className="font-semibold text-gray-900 mb-3 md:mb-4 text-base md:text-lg">Vagas Disponíveis</h2>
        <div className="space-y-3">
          {parkings.map((parking) => (
            <div
              key={parking.id}
              onClick={() => navigate(`/parking/${parking.id}`)}
              className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border-2 ${
                selectedParking === parking.id
                  ? "border-blue-600"
                  : "border-transparent"
              }`}
            >
              {/* Linha 1: Número da vaga + Tag de status */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{parking.spotNumber}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{parking.name}</h3>
                    <p className="text-xs text-gray-500">{parking.distance}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    parking.availableSpots > 10
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}>
                    {parking.availableSpots > 10 ? "LIVRE" : "POUCOS"}
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    R${parking.price}/h
                  </span>
                </div>
              </div>

              {/* Linha 2: Endereço e disponibilidade */}
              <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{parking.address}</span>
                </div>
                <span className="font-medium">{parking.availableSpots}/{parking.totalSpots} vagas</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
