import { useState } from "react";

export default function LikeButton(){
    const [likes, setLikes] = useState(0);

    const handleLike = () => {
        setLikes(likes + 1);
    };
    return (
        <div>
          <button onClick={handleLike}>Like</button>
          <p>{likes} {"Likes"}</p>
        </div>
    );   
}