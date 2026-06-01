import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Shield,
  Car,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import BottomNavigation from "../components/BottomNavigation";
import {
  getParkingLotById,
  type ParkingLot,
} from "../../services/parkyApi";


export default function ParkingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hours, setHours] = useState(2);
  
  // Guardamos o objeto Date completo para facilitar a navegação do calendário inline
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState("09:00");

const [parking, setParking] = useState<ParkingLot | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  async function loadParkingDetails() {
    if (!id) {
      setError("ID do estacionamento não informado.");
      setLoading(false);
      return;
    }

    try {
      const data = await getParkingLotById(id);
      setParking(data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar os detalhes do estacionamento.");
    } finally {
      setLoading(false);
    }
  }

  loadParkingDetails();
}, [id]);

if (loading) {
  return (
    <div className="size-full bg-gray-50 flex items-center justify-center">
      <div className="flex items-center gap-2 text-blue-600">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm font-medium">Carregando detalhes...</span>
      </div>
    </div>
  );
}

if (error || !parking) {
  return (
    <div className="size-full bg-gray-50 flex flex-col items-center justify-center px-6">
      <p className="text-red-600 text-sm mb-4 text-center">
        {error || "Estacionamento não encontrado."}
      </p>

      <button
        onClick={() => navigate("/locals")}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
      >
        Voltar para estacionamentos
      </button>
    </div>
  );
}

const occupiedSpots = parking.total_spots - parking.available_spots;
const totalPrice = parking.price_per_hour * hours;

const parkingForReservation = {
  id: parking.id,
  name: parking.name,
  address: parking.address,
  price: parking.price_per_hour,
  availableSpots: parking.available_spots,
  occupiedSpots,
  totalSpots: parking.total_spots,
};

  // --- Lógica do Calendário Incorporado ---
  const todayStr = new Date().toISOString().split('T')[0];
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Dias do mês atual
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Dia da semana que começa o mês (0 = Domingo, 1 = Segunda...)
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const monthsBr = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  // Gera a lista de dias para renderizar na grid
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    // Formata para YYYY-MM-DD local de forma segura
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return { day, dateString };
  });

  return (
    <div className="size-full bg-gray-50 flex flex-col md:flex-row">
      {/* Left Panel - Image (Desktop) */}
      <div className="relative h-56 md:h-auto md:w-1/2 lg:w-2/5 bg-gradient-to-br from-blue-600 to-blue-800">
        <button
          onClick={() => navigate("/locals")}
          className="absolute top-3 left-3 md:top-4 md:left-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-900" />
        </button>
        <div className="absolute inset-0 flex items-center justify-center">
          <Car className="w-20 h-20 md:w-32 md:h-32 text-white opacity-50" />
        </div>
      </div>

      {/* Right Panel - Content */}
      <div className="flex-1 md:overflow-auto flex flex-col">
        <div className="flex-1 overflow-auto px-4 md:px-8 lg:px-12 py-4 md:py-8">
          {/* Title */}
          <div className="mb-4 md:mb-6">
            <h1 className="text-xl md:text-3xl font-bold text-gray-900">{parking.name}</h1>
          </div>

          {/* Address */}
          <div className="flex items-start gap-2 md:gap-3 mb-4 md:mb-6 p-3 md:p-4 bg-white rounded-xl shadow-sm">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-indigo-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 text-sm md:text-base">Localização</p>
              <p className="text-xs md:text-sm text-gray-600">{parking.address}</p>
            </div>
          </div>

          {/* Features */}
          <div className="mb-4 md:mb-6">
            <h3 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">Comodidades</h3>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {["Coberto", "Segurança 24h", "CCTV", "QR Code"].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 p-2 md:p-3 bg-white rounded-lg shadow-sm">
                  <Shield className="w-3 h-3 md:w-4 md:h-4 text-indigo-600" />
                  <span className="text-xs md:text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* REAL-TIME DATA - Available/Occupied Spots */}
          <div className="mb-4 md:mb-6">
            <h3 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">Disponibilidade em Tempo Real</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <p className="text-xs text-green-600 font-medium mb-1">Vagas Livres</p>
                <p className="text-3xl font-bold text-green-700">{parking.available_spots}</p>
              </div>
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <p className="text-xs text-red-600 font-medium mb-1">Ocupadas</p>
                <p className="text-3xl font-bold text-red-700">{occupiedSpots}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Total: {parking.totalSpots} vagas • Horário: 24h
            </p>
          </div>

          {/* NOVO SELETOR DE DATA (EMBED) E HORA */}
          <div className="mb-4 md:mb-6">
            <h3 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">Selecione Data e Hora</h3>
            
            <div className="flex flex-col gap-4">
              {/* Calendário Inline */}
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                {/* Header do Calendário */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 font-semibold text-gray-800 text-sm md:text-base">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    <span>{monthsBr[month]} de {year}</span>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      type="button"
                      onClick={handlePrevMonth}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      type="button"
                      onClick={handleNextMonth}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Dias da Semana */}
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {weekDays.map((d) => (
                    <span key={d} className="text-xs font-medium text-gray-400 py-1">{d}</span>
                  ))}
                </div>

                {/* Grid de Dias do Mês */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {/* Espaços vazios para alinhar o primeiro dia da semana */}
                  {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}

                  {/* Render dos dias reais */}
                  {daysArray.map(({ day, dateString }) => {
                    const isSelected = selectedDate === dateString;
                    const isPast = dateString < todayStr;

                    return (
                      <button
                        key={dateString}
                        type="button"
                        disabled={isPast}
                        onClick={() => setSelectedDate(dateString)}
                        className={`
                          text-xs md:text-sm font-medium py-2 rounded-lg transition-all relative
                          ${isSelected 
                            ? "bg-indigo-600 text-white shadow-md font-bold" 
                            : "text-gray-700 hover:bg-indigo-50"
                          }
                          ${isPast ? "text-gray-300 hover:bg-transparent cursor-not-allowed" : ""}
                          ${dateString === todayStr && !isSelected ? "border border-indigo-400" : ""}
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input de Hora (Abaixo do calendário) */}
              <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <label className="text-xs md:text-sm text-gray-600 font-medium">Horário de Chegada</label>
                </div>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="text-sm md:text-base font-semibold text-gray-900 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Duration Selector */}
          <div className="mb-4 md:mb-6">
            <h3 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">Duração</h3>
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl shadow-sm">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
              <div className="flex-1">
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={hours}
                  onChange={(e) => setHours(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs md:text-sm text-gray-600 mt-1">
                  <span>1h</span>
                  <span className="font-semibold text-indigo-600">{hours}h</span>
                  <span>12h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 mb-4 md:mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm md:text-base">R$ {parking.price_per_hour}/hora</span>
              <span className="text-gray-600 text-sm md:text-base">× {hours} horas</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="font-semibold text-gray-900 text-sm md:text-base">Total</span>
              <span className="text-xl md:text-2xl font-bold text-blue-600">R$ {totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Bottom Button - Reservar Vaga */}
        <div className="p-4 md:p-6 bg-white border-t border-gray-200 pb-20 md:pb-6">
          <button
            onClick={() => navigate("/reservation", {state: { parking: parkingForReservation, hours, totalPrice, selectedDate, selectedTime,
    },
  })
}
            className="w-full bg-blue-600 text-white py-4 md:py-5 rounded-xl text-base md:text-lg font-bold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Reservar Vaga
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}