export default function List(){
  const items = ['Sans', 'papyrus', 'undertale', 'Undyne', 'Guille'];
  return (
    <ul className="flex justify-between w-full px-10 py-5">
      {items.map((item, index) => (
        <button key={index} className ="hover:text-sky-700">{item}</button>
      ))}
    </ul>
  );
};

