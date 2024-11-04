// pages/contact.js
import Head from 'next/head';
import { useState } from 'react';
import { useContext } from 'react';
import { LanguageContext } from '../pages/_app';
import Link from 'next/link';

export default function Contact() {
    const { t } = useContext(LanguageContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Aquí puedes agregar la lógica para enviar el mensaje, por ejemplo, a una API
        try {
            // Simulación de envío de datos
            await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            // Aquí puedes manejar la respuesta
            setSuccess('Mensaje enviado con éxito!');
            setName('');
            setEmail('');
            setMessage('');
        } catch (err) {
            setError('Hubo un problema al enviar el mensaje. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen justify-center" style={{ backgroundImage: "url('/cake_tienda.jpg')",backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'}}>
            <Head>
                <title>Contacto - Tortas del Guille</title>
            </Head>
            <h1 className="text-4xl mb-4 bg-gray-800 bg-opacity-75">{t("contact")}</h1>

            {/* Datos de contacto */}
            <div className="mb-8 bg-gray-800 bg-opacity-75">
                <h2 className="text-2xl mb-2">{t("contactInfo")}</h2>
                <p><strong>{t("phone")}:</strong> +56 9 1234 5678</p>
                <p><strong>{t("email")}::</strong> contacto@tortasdelguille.cl</p>
                <p><strong>{t("address")}:</strong> Av. Ejemplo 1234, Santiago, Chile</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg text-black">
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-bold mb-2">{t("name")}</label>
                    <input
                        type="text"
                        id="name"
                        className="border border-gray-300 rounded w-full p-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-bold mb-2">{t("email")}</label>
                    <input
                        type="email"
                        id="email"
                        className="border border-gray-300 rounded w-full p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-bold mb-2">{t("sendMessage")}</label>
                    <textarea
                        id="message"
                        className="border border-gray-300 rounded w-full p-2"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    {t("sendMessage")}
                </button>
            </form>
            <Link href="/">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm md:text-base">{t("home")}</button>
            </Link>
        </div>
    );
}
