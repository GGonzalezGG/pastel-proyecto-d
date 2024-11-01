import Link from 'next/link';
export default function List(){
  const items = ['Sans', 'papyrus', 'undertale', 'Undyne', 'Guille'];
  return (
    <ul className="flex justify-between w-full px-10 py-5">
      <Link href="/tienda" className="text-4xl">Tienda</Link>
      <Link href="es" className="text-4xl">Locales</Link>
      <Link href="de" className="text-4xl">Contacto</Link>
      <Link href="fr" className="text-4xl">Sans Undertale</Link>
      <Link href="it" className="text-4xl">Idioma</Link>
    </ul>
  );
};

