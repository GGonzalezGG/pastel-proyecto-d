"use client";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../../components/header";
import { useAuth } from "../context/AuthContext";
import CakeCustomizer from '@/components/CakeCustomizer';
import { LanguageProvider } from '../../context/languageContext';

export default function Custom() {
  return (
    <LanguageProvider>
      <ProtectedRoute>
        <div style={{ 
          backgroundImage: "url('/xd.jpg')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
          <Header />
          <div className="md:container mx-auto md">
            <CakeCustomizer />
          </div>
        </div>
      </ProtectedRoute>
    </LanguageProvider>
  );
}