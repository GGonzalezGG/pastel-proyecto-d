import Link from 'next/link';
import { useContext } from 'react';
import { LanguageContext } from '../pages/_app';

export default function Header() {
    const { t } = useContext(LanguageContext);
    return (
        <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-200 bg-opacity-25">
            <div className="flex-grow text-center">
                <h1 className="text-3xl md:text-4xl">{t("welcome")}</h1>
            </div>
            <div className="flex-none space-x-2 mt-2 md:mt-0">
                <Link href="/login">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm md:text-base">{t("login")}</button>
                </Link>
                <Link href="/register">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm md:text-base">{t("register")}</button>
                </Link>
            </div>
        </header>
    );
}