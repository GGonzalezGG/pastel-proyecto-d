import Link from 'next/link';
export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('/cake_tienda.jpg')" }}>
      <title>Tienda</title>
      <h1 className="text-center text-4xl font-black">Tienda</h1>
      <Link href="/" className="text-4xl">Volver al inicio</Link>
    </div>
  );
}