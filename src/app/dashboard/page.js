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
    
      <div style={{ 
        backgroundImage: "url('/xd.jpg')", backgroundSize: 'cover', backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}}>
        <div className="bg-gray-900 bg-opacity-90 p-3">
          <h1 className="text-center text-4xl text-white">Welcome {user?.username}</h1>
        </div>
        <div className="md:container mx-auto md">
          <CakeCustomizer />
        </div>
      </div>
    
  );
}