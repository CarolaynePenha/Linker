import { useContext, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";

import UserContext from "../context/UserContext";
import TokenContext from "../context/TokenContext";
import axios from "axios";

export default function LikePost({ post, updatePosts, loading }) {
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [liked, setLiked] = useState(false);
  const [likesNumber, setLikesNumber] = useState(0);
  const [otherLikes, setOtherLikes] = useState(0);
  const [otherLikesName, setOtherLikesName] = useState();

  useEffect(() => {
    const likeName = post.likedBy.find((item) => item.userId !== user.id);
    const isLiked = post.likedBy.find((item) => item.userId === user.id);
    setOtherLikesName(likeName);
    setLikesNumber(Number(post.likes));
    if (isLiked) {
      setLiked(true);
    }
    if (isLiked && post.likes >= 3) {
      const likes = post.likes - 2;
      setOtherLikes(likes);
    } else if (!isLiked && post.likes >= 2) {
      const likes = post.likes - 1;
      setOtherLikes(likes);
    }
  }, [token, updatePosts, loading, post.likedBy, post.likes, user.id]);

  async function postLike() {
    if (liked) {
      setLikesNumber(likesNumber - 1);
    } else {
      setLikesNumber(likesNumber + 1);
    }
    const { id } = post;
    const URL = process.env.REACT_APP_API_URL + `/timeline/like/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.post(URL, "", config);
      setLiked(!liked);
    } catch (err) {
      console.log(err.response);
    }
  }

  return (
    <div className="like-icon">
      {likesNumber === 0 ? (
        <>
          <FaRegHeart onClick={postLike} size={30} color="#ffffff" />
          <p>{likesNumber} likes</p>
        </>
      ) : liked ? (
        <>
          <IoMdHeart onClick={postLike} color="red" size={30} />
          <p
            data-tooltip-id="my-tooltip"
            data-tooltip-content={`Você${
              otherLikesName?.name ? `, ${otherLikesName.name}` : ""
            } ${otherLikes >= 1 ? `e outras ${otherLikes} pessoas` : ""}`}
          >
            {likesNumber}
          </p>
        </>
      ) : (
        <>
          <FaRegHeart onClick={postLike} color="white" />
          <p
            data-tooltip-id="my-tooltip"
            data-tooltip-content={` 
              ${otherLikesName?.name ? ` ${otherLikesName.name}` : ""} ${
              otherLikes >= 1 ? `e outras ${otherLikes} pessoas` : ""
            }`}
          >
            {likesNumber}
          </p>
        </>
      )}
    </div>
  );
}
