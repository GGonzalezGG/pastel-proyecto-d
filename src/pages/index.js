import LikeButton from "@/components/likebutton"; 
import List from "@/components/list";
import Header from "@/components/header";
import Head from 'next/head';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('/cakes.png')" }}>
            <Head>
                <title>Tortas del Guille</title>
            </Head>
            <Header />
            <div className="flex-grow p-4 md:p-6 lg:p-8"> 
                <List />
            </div>
            <LikeButton className="mb-4 md:mb-8 lg:mb-12" /> 
        </div>
    );
}



