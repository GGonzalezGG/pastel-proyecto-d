import { useState } from "react";

export default function LikeButton(){
    const [likes, setLikes] = useState(0);

    const handleLike = () => {
        setLikes(likes + 1);
    };
    return (
        <div className="flex gap-5 justify-center">
          <button className = "p-1 bg-blue-700 border-2 rounded-lg border-white" onClick={handleLike}>Like</button>
          <p className="py-1">{likes} {"Likes"}</p>
        </div>
    );   
}