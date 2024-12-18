"use client";
import Link from "next/link";
import { useState, useContext } from "react";
import { LanguageProvider } from '../../context/languageContext';
import { LanguageContext } from "../../context/languageContext";

export default function Register() {
    const { t } = useContext(LanguageContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        
        try {
            const res = await fetch("/api/register", {  // Make sure it's exactly this URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password })
            });
    
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Registration failed');
            }
    
            const data = await res.json();
            alert('Registration successful!');
            // Handle successful registration here
            
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.message);
        }
    };

    return(
        <LanguageProvider>
            <div 
            style={{ 
                backgroundImage: "url('/cake_register.jpg')", 
                backgroundSize: 'cover',
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="text-4xl text-white flex flex-col gap-2 align-center justify-center h-screen items-center">
                <div className="bg-gray-800 bg-opacity-75 rounded-xl p-2">
                    {t("register")}
                </div>
                    <div className="text-xl w-full max-w-xs">
                        <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            {error && (
                                <div className="mb-4 text-red-500 text-sm">
                                    {error}
                                </div>
                            )}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {t("username")}
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="username" 
                                    type="text" 
                                    placeholder= {t("username")}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {t("password")}
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="password" 
                                    type="password" 
                                    placeholder="******************" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center justify-center">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                    {t("register")}
                                </button>
                            </div>
                        </form>
                    </div> 
                    <Link href="/" className="bg-gray-800 bg-opacity-75 rounded-xl p-2">
                        {t("home")}
                    </Link>
                </div>
            </div>
        </LanguageProvider>
    );
}