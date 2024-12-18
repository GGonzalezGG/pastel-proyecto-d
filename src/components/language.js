// components/LanguageSelector.js
import { useContext } from "react";
import { LanguageContext } from "@/context/languageContext";

export default function LanguageSelector() {
    const { language, changeLanguage, t } = useContext(LanguageContext);

    const handleLanguageChange = (e) => {
        changeLanguage(e.target.value);
    };

    return (
        <div className="flex items-center">
            <label htmlFor="language" className="text-2xl md:text-3xl font-medium mr-2">
            </label>
            <select
                id="language"
                value={language}
                onChange={handleLanguageChange}
                className="border border-gray-300 rounded p-2 text-sm sm:text-base text-black"
            >
                <option value="es">{t("spanish")}</option>
                <option value="en">{t("english")}</option>
                <option value="fr">{t("french")}</option>
                <option value="de">{t("german")}</option>
            </select>
        </div>
    );
}

