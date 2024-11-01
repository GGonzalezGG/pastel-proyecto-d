import Link from 'next/link';

export default function List() {
  return (
    <ul className="flex flex-col md:flex-row justify-around items-center w-full px-4 py-5 space-y-4 md:space-y-0 md:space-x-6">
      <li>
        <Link href="/tienda" className="text-2xl md:text-4xl">Tienda</Link>
      </li>
      <li>
        <Link href="/es" className="text-2xl md:text-4xl">Locales</Link>
      </li>
      <li>
        <Link href="/de" className="text-2xl md:text-4xl">Contacto</Link>
      </li>
      <li>
        <Link href="/fr" className="text-2xl md:text-4xl">Sans</Link>
      </li>
      <li>
        <Link href="/it" className="text-2xl md:text-4xl">Idioma</Link>
      </li>
    </ul>
  );
}

