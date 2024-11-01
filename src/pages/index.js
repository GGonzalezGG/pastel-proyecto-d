import LikeButton from "@/components/likebutton";
import List from "@/components/list";
import Image from "@/components/image";
export default function Home() {
  return (
    <div>
      <title>Tortas del Guille</title>
      <h1 className="text-center text-4xl">Bienvenido</h1>
      <List/>
      <Image/>
      <LikeButton/>
    </div>
  );
}
