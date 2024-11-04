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
    <ProtectedRoute>
      <div style={{ 
        backgroundImage: "url('/xd.jpg')", backgroundSize: 'cover', backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}}>
        <div className="bg-gray-900 bg-opacity-90 p-3 flex items-center justify-between flex-wrap md:flex-nowrap">
          <h1 className="text-center text-4xl text-white w-full md:w-auto mb-4 md:mb-0">Welcome {user?.username}</h1>
          <button className="font-medium bg-gray-100 text-stone-900 py-3 px-4 rounded-lg hover:bg-red-600 hover:text-gray-50 transition-colors md:ml-auto" onClick={handleLogout}>
            Log out</button>
        </div>
        <div className="md:container mx-auto md">
          <CakeCustomizer />
        </div>
      </div>
    </ProtectedRoute>
      
    
  );
}