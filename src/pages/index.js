// pages/index.js
import LikeButton from "@/components/likebutton"; 
import List from "@/components/list";
import Header from "@/components/header";
import Head from 'next/head';
import LanguageSelector from "@/components/language";
import ImageCarousel from '@/components/ImageCarousel';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('/cakes.png')" }}>
            <Head>
                <title>Tortas del Guille</title>
            </Head>
            <Header />
            <div className="flex-grow flex flex-col items-center">
                <div className="flex flex-col sm:flex-row justify-between items-center w-full px-10 bg-gray-500 bg-opacity-25"> {/* Espacio entre el título y la lista */}
                    <div className="flex-grow"> {/* Esto permitirá que la lista ocupe el espacio disponible */}
                        <List />
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-4"> {/* Margen superior para móviles */}
                        <LanguageSelector />
                    </div>
                </div>
                <ImageCarousel/>
            </div>
            <footer className="text-white py-4 bg-gray-900 bg-opacity-90">
                 <div className="container mx-auto text-center">
                    <p className="text-sm">
                         &copy; {new Date().getFullYear()} Tortas del Guille. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}



