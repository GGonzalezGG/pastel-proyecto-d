'use client';
import { AuthProvider } from '@/app/context/AuthContext'; 
import { LanguageProvider } from '../context/languageContext';

export default function Providers({ children }) {
    return (
        <AuthProvider>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </AuthProvider>
    );
}