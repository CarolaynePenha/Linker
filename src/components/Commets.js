import { useContext } from "react";
import UserContext from "../context/UserContext";
import { FaCheck } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";

export default function Comments({ comment, following, postUserId }) {
  console.log("following: ", following);
  const { user } = useContext(UserContext);

  return (
    <>
      {comment && (
        <div className="comment-infos">
          <div className="image">
            <img src={comment.image} alt="imagem do usuário" />
          </div>
          <div className="comment-text">
            {postUserId === comment.userId && (
              <p>
                <strong>{comment.name}</strong>
                <small>
                  <GoDotFill size={12} color="#95B0B5" /> autor do post{" "}
                </small>
              </p>
            )}
            {following?.[0]?.followedId === comment.userId && (
              <p>
                <strong>{comment.name}</strong>
                <small>
                  <FaCheck size={12} color="#95B0B5" /> seguindo
                </small>
              </p>
            )}
            {!following && user.id !== comment.userId && (
              <p>
                <strong>{comment.name}</strong>
              </p>
            )}

            <p>{comment.commentText}</p>
          </div>
        </div>
      )}
      {!comment && (
        <p className="no-comments">Não há nenhum comentário ainda.</p>
      )}
    </>
  );
}
