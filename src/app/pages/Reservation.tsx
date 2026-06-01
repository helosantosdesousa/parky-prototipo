import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import BottomNavigation from "../components/BottomNavigation";
import { createReservation } from "../../services/parkyApi";

export default function Reservation() {
  const navigate = useNavigate();
  const location = useLocation();

  const { parking, hours, totalPrice, selectedDate, selectedTime } =
    location.state || {};

  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Áreas do estacionamento
  const areas = [
    { id: "2.1", name: "Área 2.1", available: true, spots: 15 },
    { id: "2.2", name: "Área 2.2", available: true, spots: 8 },
    { id: "2.3", name: "Área 2.3", available: true, spots: 12 },
  ];

  function buildReservationDateTimes() {
    const today = new Date().toISOString().split("T")[0];

    const dateValue = selectedDate || today;
    const timeValue = selectedTime || "09:00";

    const normalizedTime =
      timeValue.length === 5 ? `${timeValue}:00` : timeValue;

    const startDateTime = new Date(`${dateValue}T${normalizedTime}`);
    const endDateTime = new Date(startDateTime);

    endDateTime.setHours(endDateTime.getHours() + Number(hours || 2));

    return {
      start_time: startDateTime.toISOString(),
      end_time: endDateTime.toISOString(),
    };
  }

  const handleConfirm = async () => {
    if (!selectedArea) {
      alert("Por favor, selecione uma área");
      return;
    }

    if (!parking?.id) {
      setError("Dados do estacionamento não encontrados.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const { start_time, end_time } = buildReservationDateTimes();

      const reservation = await createReservation({
        user_name: "Diogo",
        parking_lot_id: Number(parking.id),
        start_time,
        end_time,
      });

      navigate("/reservation/confirmed", {
        state: {
          parking,
          hours,
          totalPrice,
          selectedDate,
          selectedTime,
          selectedArea,
          reservation,
        },
      });
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Não foi possível criar a reserva.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-[#1e40af] px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          <div>
            <h1 className="text-white text-xl font-bold">Selecione a Área</h1>
            <p className="text-blue-200 text-sm">
              {parking?.name || "Estacionamento"}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-6 pb-32">
        {/* Info Card */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 text-xs mb-1">Data</p>
              <p className="font-semibold text-gray-900">
                {selectedDate
                  ? new Date(selectedDate + "T00:00:00").toLocaleDateString(
                      "pt-BR"
                    )
                  : "Hoje"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-xs mb-1">Horário</p>
              <p className="font-semibold text-gray-900">
                {selectedTime || "09:00"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-xs mb-1">Duração</p>
              <p className="font-semibold text-gray-900">{hours || 2}h</p>
            </div>

            <div>
              <p className="text-gray-500 text-xs mb-1">Total</p>
              <p className="font-semibold text-blue-600">
                R$ {totalPrice || 30}
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Parking Lot Blueprint/Map */}
        <div className="mb-6">
          <h2 className="font-bold text-gray-900 mb-3">
            Layout do Estacionamento
          </h2>

          <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-200">
            <div className="space-y-4">
              {/* Entrada */}
              <div className="text-center pb-3 border-b-2 border-dashed border-gray-300">
                <div className="inline-block bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                  ↓ ENTRADA
                </div>
              </div>

              {/* Grid de Áreas */}
              <div className="grid grid-cols-1 gap-3">
                {areas.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => setSelectedArea(area.id)}
                    disabled={!area.available}
                    className={`relative p-6 rounded-xl border-2 transition-all ${
                      selectedArea === area.id
                        ? "border-blue-600 bg-blue-50 shadow-lg"
                        : area.available
                        ? "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50"
                        : "border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {/* Grid visual de vagas */}
                    <div className="grid grid-cols-5 gap-1 mb-3">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-6 rounded ${
                            i < area.spots / 2 ? "bg-green-400" : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-left">
                        <p className="font-bold text-gray-900 text-lg">
                          {area.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {area.spots} vagas disponíveis
                        </p>
                      </div>

                      {selectedArea === area.id && (
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          ✓ Selecionada
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Saída */}
              <div className="text-center pt-3 border-t-2 border-dashed border-gray-300">
                <div className="inline-block bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                  ↑ SAÍDA
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-400 rounded"></div>
            <span>Vaga livre</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <span>Ocupada</span>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 pb-24">
        <button
          onClick={handleConfirm}
          disabled={!selectedArea || isSubmitting}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
          {isSubmitting ? "Criando reserva..." : "Confirmar Reserva"}
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
}