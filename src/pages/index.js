import LikeButton from "@/components/likebutton";
import List from "@/components/list";
import Image from "@/components/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-center text-4xl">Sans Undertale</h1>
      <List/>
      <Image/>
      <LikeButton/>
    </div>
  );
}
