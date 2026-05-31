import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Search, MapPin, Star, Navigation, Loader2 } from "lucide-react";
import BottomNavigation from "../components/BottomNavigation";
import { getParkingLots, type ParkingLot } from "../../services/parkyApi";

export default function Locals() {
  const navigate = useNavigate();

  const [parkings, setParkings] = useState<ParkingLot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadParkingLots() {
      try {
        const data = await getParkingLots();
        setParkings(data);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os estacionamentos.");
      } finally {
        setLoading(false);
      }
    }

    loadParkingLots();
  }, []);

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-[#1e40af] px-6 py-6 pb-8">
        <h1 className="text-white text-2xl font-bold mb-4">
          Estacionamentos perto de você
        </h1>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar estacionamento..."
            className="w-full pl-12 pr-4 py-3 text-sm bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
          />
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center -mt-4">
        <div className="absolute top-4 right-4">
          <button className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
            <Navigation className="w-5 h-5 text-blue-600" />
          </button>
        </div>

        <div className="text-center">
          <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Mapa de Estacionamentos</p>
        </div>
      </div>

      {/* Parking List */}
      <div className="flex-1 overflow-auto px-6 py-4 pb-24">
        {loading && (
          <div className="flex items-center justify-center gap-2 text-blue-600 py-8">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm font-medium">Carregando estacionamentos...</span>
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
            {error}
          </div>
        )}

        {!loading && !error && parkings.length === 0 && (
          <div className="bg-white rounded-xl p-4 text-center text-gray-600 text-sm">
            Nenhum estacionamento disponível no momento.
          </div>
        )}

        {!loading && !error && parkings.length > 0 && (
          <div className="space-y-3">
            {parkings.map((parking, index) => (
              <div
                key={parking.id}
                onClick={() => navigate(`/parking/${parking.id}`)}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-base mb-1">
                      {parking.name}
                    </h3>

                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{parking.address}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm text-blue-600 font-medium">
                        {index === 0 ? "a 400m" : "a 850m"}
                      </span>

                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold text-gray-900">
                          {index === 0 ? "4.8" : "4.5"}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({index === 0 ? "342" : "187"})
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      {parking.available_spots} vagas disponíveis de{" "}
                      {parking.total_spots}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-600">
                      R${parking.price_per_hour}
                    </p>
                    <p className="text-xs text-gray-500">/hora</p>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
                  Ver Detalhes
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}