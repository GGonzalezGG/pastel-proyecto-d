import Link from 'next/link';
import { useContext } from 'react';
import { LanguageContext } from '../pages/_app';

export default function List() {
    const { t } = useContext(LanguageContext);

    return (
        <ul className="flex flex-col md:flex-row justify-around items-center w-full px-4 py-5 space-y-4 md:space-y-0 md:space-x-6">
            <li>
                <Link href="/tienda" className="text-2xl md:text-4xl">{t("store")}</Link>
            </li>
            <li>
                <Link href="/es" className="text-2xl md:text-3xl">{t("locations")}</Link>
            </li>
            <li>
                <Link href="/de" className="text-2xl md:text-3xl">{t("contact")}</Link>
            </li>
            <li>
                <Link href="/dashboard" className="text-2xl md:text-3xl">{t("customize")}</Link>
            </li>
        </ul>
    );
}
