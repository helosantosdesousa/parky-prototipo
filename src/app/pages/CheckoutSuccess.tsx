import { useNavigate } from "react-router";
import {
  CheckCircle,
  Clock,
  CreditCard,
  Trophy,
  Star,
} from "lucide-react";
import { useState } from "react";
import BottomNavigation from "../components/BottomNavigation";

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  // Mock data
  const checkoutData = {
    parkingName: "Estacionamento Central",
    totalTime: "1h 45min",
    totalPaid: "R$ 15,00",
    paymentMethod: "Visa •••• 1234",
    pointsEarned: 15,
  };

  const handleSubmitRating = () => {
    if (rating === 0) {
      alert("Por favor, selecione uma avaliação");
      return;
    }
    alert(`Obrigado pela avaliação de ${rating} estrelas!`);
    navigate("/home");
  };

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Success Header */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 px-6 py-10 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Checkout realizado com sucesso!
        </h1>
        <p className="text-green-100 text-lg">
          Volte sempre 😊
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 -mt-6 pb-32">
        {/* Summary Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="font-bold text-gray-900 text-lg mb-4">
            Resumo do Estacionamento
          </h2>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">
                  Tempo Total
                </span>
              </div>
              <span className="font-bold text-gray-900">
                {checkoutData.totalTime}
              </span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">
                  Forma de Pagamento
                </span>
              </div>
              <span className="font-bold text-gray-900">
                {checkoutData.paymentMethod}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-gray-900 font-bold text-lg">
                Total Pago
              </span>
              <span className="text-3xl font-bold text-blue-600">
                {checkoutData.totalPaid}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">Local</p>
            <p className="font-semibold text-gray-900">
              {checkoutData.parkingName}
            </p>
          </div>
        </div>

  
        {/* Rating Component */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="font-bold text-gray-900 text-lg mb-2 text-center">
            Avaliar este Estacionamento
          </h3>
          <p className="text-gray-600 text-sm text-center mb-6">
            Sua opinião é muito importante para nós!
          </p>

          {/* 5-Star Rating */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-12 h-12 ${
                    star <= (hoveredRating || rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          {rating > 0 && (
            <p className="text-center text-gray-600 mb-4">
              {rating === 5 && "Excelente! 🎉"}
              {rating === 4 && "Muito bom! 👍"}
              {rating === 3 && "Bom 😊"}
              {rating === 2 && "Pode melhorar 🤔"}
              {rating === 1 && "Ruim 😞"}
            </p>
          )}

          <button
            onClick={handleSubmitRating}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Enviar Avaliação
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => navigate("/home")}
          className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors"
        >
          Fechar
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
}