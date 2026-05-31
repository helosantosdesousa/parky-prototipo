import { useNavigate } from "react-router";
import { User, Mail, ChevronRight, Car, CreditCard, History, Settings, LogOut } from "lucide-react";
import BottomNavigation from "../components/BottomNavigation";

export default function Profile() {
  const navigate = useNavigate();

  const user = {
    name: "João Silva",
    email: "joao.silva@email.com",
    avatar: null, // null = usar ícone padrão
  };

  const menuItems = [
    {
      icon: User,
      label: "Meus Dados",
      description: "Editar informações pessoais",
      onClick: () => alert("Funcionalidade em desenvolvimento"),
    },
    {
      icon: Car,
      label: "Meus Veículos",
      description: "Gerenciar placas (ex: ABC-1234)",
      onClick: () => alert("Funcionalidade em desenvolvimento"),
    }
  ];

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header com Profile Picture */}
      <div className="bg-[#1e40af] px-6 py-8 pb-16">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-20 h-20 bg-blue-700 rounded-full flex items-center justify-center">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-white" />
            )}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-white text-2xl font-bold mb-1">{user.name}</h1>
            <div className="flex items-center gap-2 text-blue-200">
              <Mail className="w-4 h-4" />
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="flex-1 overflow-auto px-6 -mt-8 pb-24">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                index !== menuItems.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <item.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        {/* Settings & Logout */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <button
            onClick={() => alert("Funcionalidade em desenvolvimento")}
            className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-gray-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-gray-900">Configurações</p>
              <p className="text-sm text-gray-500">Preferências do app</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => {
              if (confirm("Tem certeza que deseja sair?")) {
                navigate("/");
              }
            }}
            className="w-full flex items-center gap-4 p-4 hover:bg-red-50 transition-colors"
          >
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <LogOut className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-red-600">Sair</p>
              <p className="text-sm text-red-400">Desconectar da conta</p>
            </div>
          </button>
        </div>

        
      </div>

      <BottomNavigation />
    </div>
  );
}
