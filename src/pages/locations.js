import Head from 'next/head';
import Map from '@/components/map';
import Link from 'next/link';
import { useContext } from 'react';
import { LanguageContext } from '../pages/_app';

export default function MapPage() {
  const { t } = useContext(LanguageContext);
  return (
    <div>
      <Head>
        <title>Mapa de Tiendas</title>
      </Head>
      <h1 className="text-center text-3xl bg-gray-900 bg-opacity-90 py-2">{t("locations")}</h1>
      <Map />
      <footer className="flex justify-end p-4"> {/* Usar flex para alinear a la derecha */}
        <Link href="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm md:text-base">{t("home")}</button>
        </Link>
      </footer>
    </div>
  );
}

