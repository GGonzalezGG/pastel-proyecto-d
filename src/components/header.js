// src/components/Header.js
'use client';
import Link from 'next/link';
import { useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LanguageContext } from '@/context/languageContext';
import { useAuth } from '../app/context/AuthContext';

export default function Header() {
    const { t, language, changeLanguage } = useContext(LanguageContext);
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        logout();
        if (pathname === '/dashboard') {  // Updated to match your route
            router.push('/login');
        }
    };

    return (
        <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-900 bg-opacity-90">
            <div className="flex-grow text-center">
                <h1 className="text-3xl md:text-4xl text-white">
                    {user ? `${t("welcome")} ${user.username}` : t("welcome")}
                </h1>
            </div>
            <div className="flex-none space-x-2 mt-2 md:mt-0">
                {user ? (
                    <button 
                        className="font-medium bg-gray-100 text-stone-900 py-2 px-4 rounded-lg hover:bg-red-600 hover:text-gray-50 transition-colors"
                        onClick={handleLogout}
                    >
                        {t("logout")}
                    </button>
                ) : (
                    <>
                        <Link href="/login">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm md:text-base">
                                {t("login")}
                            </button>
                        </Link>
                        <Link href="/register">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm md:text-base">
                                {t("register")}
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}