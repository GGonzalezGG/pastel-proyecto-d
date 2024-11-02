// pages/index.js
import LikeButton from "@/components/likebutton"; 
import List from "@/components/list";
import Header from "@/components/header";
import Head from 'next/head';
import LanguageSelector from "@/components/language";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('/cakes.png')" }}>
            <Head>
                <title>Tortas del Guille</title>
            </Head>
            <Header />
            <div className="flex-grow flex flex-col items-center">
                <div className="flex flex-col sm:flex-row justify-between items-center w-full px-10 mt-4"> {/* Espacio entre el título y la lista */}
                    <div className="flex-grow"> {/* Esto permitirá que la lista ocupe el espacio disponible */}
                        <List />
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-4"> {/* Margen superior para móviles */}
                        <LanguageSelector />
                    </div>
                </div>
            </div>
            <LikeButton className="mb-4 md:mb-8 lg:mb-12" /> 
        </div>
    );
}



