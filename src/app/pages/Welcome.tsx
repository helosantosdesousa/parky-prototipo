import { useNavigate } from "react-router";
import { ParkingSquare, MapPin, Clock, Shield } from "lucide-react";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="size-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 md:p-6">
      <div className="max-w-md w-full md:max-w-lg lg:max-w-2xl md:bg-white md:p-12 md:rounded-3xl md:shadow-2xl">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-indigo-600 rounded-full mb-4 md:mb-6">
            <ParkingSquare className="w-8 h-8 md:w-12 md:h-12 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-3">Parky</h1>
          <p className="text-base md:text-xl text-gray-600">
            Encontre e reserve vagas de estacionamento com facilidade
          </p>
        </div>

        <div className="space-y-3 md:space-y-5 mb-8 md:mb-12">
          <div className="flex items-start gap-3 md:gap-4 md:p-4 md:bg-gray-50 md:rounded-xl">
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center md:bg-indigo-100">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 md:text-lg">Localização em tempo real</h3>
              <p className="text-sm md:text-base text-gray-600">Veja estacionamentos próximos no mapa</p>
            </div>
          </div>

          <div className="flex items-start gap-3 md:gap-4 md:p-4 md:bg-gray-50 md:rounded-xl">
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center md:bg-indigo-100">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 md:text-lg">Reserve antecipadamente</h3>
              <p className="text-sm md:text-base text-gray-600">Garanta sua vaga antes de chegar</p>
            </div>
          </div>

          <div className="flex items-start gap-3 md:gap-4 md:p-4 md:bg-gray-50 md:rounded-xl">
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center md:bg-indigo-100">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 md:text-lg">Pagamento seguro</h3>
              <p className="text-sm md:text-base text-gray-600">Pague direto pelo app com segurança</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/home")}
          className="w-full bg-indigo-600 text-white py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
        >
          Começar
        </button>
      </div>
    </div>
  );
}
