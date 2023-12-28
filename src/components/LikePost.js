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
    setOtherLikesName(likeName);
    const isLiked = post.likedBy.find((item) => item.userId === user.id);
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
      console.log("entrei no 2");
      console.log("PostId", post.id);
    }
  }, [token, updatePosts, loading]);

  async function postLike() {
    if (liked) {
      setLikesNumber(likesNumber - 1);
      console.log("likesNumber: ", likesNumber);
    } else {
      setLikesNumber(likesNumber + 1);
      console.log("likesNumber: ", likesNumber);
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
    <>
      {likesNumber === 0 ? (
        <>
          <FaRegHeart onClick={postLike} color="white" />
          <p>{likesNumber}likes</p>
        </>
      ) : liked ? (
        <>
          <IoMdHeart onClick={postLike} color="red" />
          <p
            data-tooltip-id="my-tooltip"
            data-tooltip-content={`Você${
              otherLikesName?.name ? `, ${otherLikesName.name}` : ""
            } ${otherLikes >= 1 ? `e outras ${otherLikes} pessoas` : ""}`}
          >
            {likesNumber}likes
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
            {likesNumber}likes
          </p>
        </>
      )}
    </>
  );
}