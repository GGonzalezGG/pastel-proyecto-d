// components/LanguageSelector.js
import { useContext } from 'react';
import { LanguageContext } from '../pages/_app';

export default function LanguageSelector() {
    const { language, changeLanguage } = useContext(LanguageContext);

    const handleLanguageChange = (e) => {
        changeLanguage(e.target.value);
    };

    return (
        <div className="flex items-center">
            <label htmlFor="language" className="text-2xl md:text-3xl font-medium mr-2">Idioma:</label>
            <select
                id="language"
                value={language}
                onChange={handleLanguageChange}
                className="border border-gray-300 rounded p-1 text-sm sm:text-base text-black"
            >
                <option value="es">Español</option>
                <option value="en">Inglés</option>
                <option value="fr">Francés</option>
                <option value="de">Alemán</option>
            </select>
        </div>
    );
}
