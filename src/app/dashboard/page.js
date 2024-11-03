"use client";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import CakeCustomizer from '@/components/CakeCustomizer';

export default function Custom() {
  const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };
  
  return (
    
      <div className="bg-gray-100">
        <h1>Bienvenido {user?.username}</h1>
          <div className="md:container mx-auto py-8 md">
        <CakeCustomizer />
      </div>
      </div>
    
  );
}