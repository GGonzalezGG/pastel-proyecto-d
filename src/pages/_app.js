import "@/styles/globals.css";
import { useEffect, useState, createContext } from 'react';

// Crear el contexto de idioma
export const LanguageContext = createContext();

export default function App({ Component, pageProps }) {
    const [language, setLanguage] = useState('es'); // Idioma predeterminado: español

    useEffect(() => {
        // Obtener el idioma guardado en local storage si existe
        const savedLanguage = localStorage.getItem('languagePreference') || 'es';
        setLanguage(savedLanguage);
    }, []);

    // Función para actualizar el idioma en el estado y en local storage
    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem('languagePreference', newLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            <Component {...pageProps} />
        </LanguageContext.Provider>
    );
}



