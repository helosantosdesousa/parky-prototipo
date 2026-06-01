import { useNavigate, useLocation } from "react-router";
import { Home, MapPin, User } from "lucide-react";

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/home") {
      return location.pathname === "/home" || location.pathname === "/";
    }
    if (path === "/locals") {
      return location.pathname === "/locals" || location.pathname.startsWith("/parking") || location.pathname.startsWith("/reservation");
    }
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50 safe-area-inset-bottom">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => navigate("/home")}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            isActive("/home") ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1 font-medium">Início</span>
        </button>

        <button
          onClick={() => navigate("/locals")}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            isActive("/locals") ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <MapPin className="w-6 h-6" />
          <span className="text-xs mt-1 font-medium">Locais</span>
        </button>

        <button
          onClick={() => navigate("/profile")}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            isActive("/profile") ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1 font-medium">Perfil</span>
        </button>
      </div>
    </div>
  );
}
