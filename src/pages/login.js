import Head from 'next/head';

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100" style={{ backgroundImage: "url('/login_bg.jpg')" }}>
            <Head>
                <title>Login - Tortas del Guille</title>
            </Head>
            <h1 className="text-4xl mb-4 bg-gray-200 bg-opacity-25 rounded-xl p-2 text-gray-800">Inicio de Sesión</h1>
            <form className="bg-white p-6 rounded shadow-md text-black">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-bold mb-2">Correo Electrónico</label>
                    <input type="email" id="email" className="border border-gray-300 rounded w-full p-2" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-bold mb-2">Contraseña</label>
                    <input type="password" id="password" className="border border-gray-300 rounded w-full p-2" required />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Iniciar Sesión</button>
            </form>
        </div>
    );
};

