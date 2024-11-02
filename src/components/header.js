import Link from 'next/link';
export default function Header() {
    return (
        <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-200 bg-opacity-25">
            <div className="flex-grow text-center">
                <h1 className="text-3xl md:text-4xl">Bienvenido</h1>
            </div>
            <div className="flex-none mt-2 md:mt-0">
                <Link href="/login">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm md:text-base">Login</button>
                </Link>
            </div>
        </header>
    );
};