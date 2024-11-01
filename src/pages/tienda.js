import Image from "@/components/image";
import Link from 'next/link';
export default function Tienda() {
  return (
    <div>
      <title>Tienda</title>
      <h1 className="text-center text-4xl">Tienda</h1>
      <Image/>
      <Link href="/" className="text-4xl justify-center">Volver al inicio</Link>
    </div>
  );
}