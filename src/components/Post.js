import { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { LuPencilLine } from "react-icons/lu";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import { AiOutlineComment } from "react-icons/ai";
import { TbSend } from "react-icons/tb";
import { IoIosShareAlt } from "react-icons/io";

import TokenContext from "../context/TokenContext";
import DeletePost from "./DeletePost";
import LikePost from "./LikePost";
import ReactHashtag from "@mdnm/react-hashtag";
import Comments from "./Commets";
import UserContext from "../context/UserContext";
import Share from "./Share";

export default function Post({
  post,
  updatePosts,
  loading,
  setUpdatePosts,
  followers,
}) {
  const inputElement = useRef();
  const [editable, setEditable] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [description, setDescription] = useState();
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [displayComments, setDisplayComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const focusInput = () => {
    inputElement.current.focus();
  };
  useEffect(() => {
    if (editable) {
      focusInput();
    }
    setDescription(post.description);
  }, [editable]);
  useEffect(() => {
    if (!loading) {
      setEditable(false);
      setDescription("");
    }
  }, [loading]);

  async function editPost(e) {
    e?.preventDefault();
    setButtonState(true);
    const { id } = post;
    const URL = process.env.REACT_APP_API_URL + `/timeline/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.put(URL, { description }, config);
      setUpdatePosts(!updatePosts);
    } catch (err) {
      console.log(err.response);
      setButtonState(false);
      alert("Houve um erro ao atualizar seu post!");
    }
  }
  function userPage(id) {
    navigate(`/user/${id}`);
  }
  function goToHashtagPage(tag) {
    const hashtag = tag.slice(1);
    navigate(`/hashtag/${hashtag}`);
  }
  function showComments() {
    setDisplayComments(!displayComments);
  }
  async function postComment(e) {
    e?.preventDefault();
    setButtonState(true);
    const { id } = post;
    const URL = process.env.REACT_APP_API_URL + `/comments/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      commentText,
    };
    try {
      await axios.post(URL, body, config);
      setButtonState(false);
      setCommentText("");
      showComments();
      setUpdatePosts(!updatePosts);
    } catch (err) {
      console.log(err.response);
      setButtonState(false);
      alert("Houve um erro ao publicar seu comentário!");
    }
  }
  const { comments } = post;

  return (
    <Article>
      {post.rePostId && (
        <div className="re-posted">
          <IoIosShareAlt size={25} color="white" />{" "}
          {post.rePostUserId === user.id ? (
            <p> Repostado por Você</p>
          ) : (
            <p> Repostado por {post.rePostName}</p>
          )}
        </div>
      )}

      <div className="post-infos">
        <Tooltip id="my-tooltip" />
        <div className="side-bar">
          <img src={post.image} alt="imagem do usuário" />
          <LikePost post={post} updatePosts={updatePosts} loading={loading} />
          <div className="comment-icon">
            <AiOutlineComment onClick={showComments} color="white" size={30} />
            <p>{comments?.length}</p>
          </div>
          <Share
            post={post}
            updatePosts={updatePosts}
            setUpdatePosts={setUpdatePosts}
            loading={loading}
          />
        </div>
        <div className="container">
          <div className="post-top">
            <p onClick={() => userPage(post.postUserId)}>
              <strong>{post.name}</strong>
            </p>
            {post.postUserId === post.userId ? (
              <>
                <div className="pencil">
                  <LuPencilLine
                    onClick={() => {
                      setButtonState(false);
                      setEditable(!editable);
                    }}
                    color="white"
                  />
                </div>
                <DeletePost
                  post={post}
                  updatePosts={updatePosts}
                  setUpdatePosts={setUpdatePosts}
                  loading={loading}
                />
              </>
            ) : (
              ""
            )}
          </div>
          {editable ? (
            <form onSubmit={editPost}>
              <textarea
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    editPost();
                  }
                  if (e.key === "Escape") {
                    e.preventDefault();
                    setEditable(!editable);
                  }
                }}
                ref={inputElement}
                type="text"
                disabled={buttonState}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </form>
          ) : (
            <p>
              <ReactHashtag onHashtagClick={(val) => goToHashtagPage(val)}>
                {post.description || ""}
              </ReactHashtag>
            </p>
          )}
          <a href={post.url} target="_blank">
            {post.imageMetadata && (
              <img src={post.imageMetadata} alt="imagem do post" />
            )}
            {(post.titleMetadata || post.descriptionMetadata) && (
              <div className="metadatas">
                <p> {post.titleMetadata}</p>
                <p>{post.descriptionMetadata}</p>
              </div>
            )}
          </a>
        </div>
      </div>
      <DivComments displayComments={displayComments}>
        {comments?.[0] &&
          comments.map((comment, index) => {
            const following = followers?.filter(
              (follower) => follower.followedId === comment.userId
            );

            return (
              <Comments
                key={index}
                comment={comment}
                following={following}
                postUserId={post.postUserId}
              />
            );
          })}
        {comments?.length === 0 && <Comments comment={false} />}

        <div className="comment-post">
          <img src={user.image} alt="imagem do usuário" />
          <form onSubmit={postComment}>
            <textarea
              type="text"
              disabled={buttonState}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />

            <button
              disabled={buttonState}
              type="submit"
              className="save-button"
            >
              <TbSend color="white" size={20} />
            </button>
          </form>
        </div>
      </DivComments>
    </Article>
  );
}

// ---------------------------css
const Article = styled.article`
  display: flex;
  flex-direction: column;
  background-color: #272330;
  width: 100%;
  margin-bottom: 20px;
  @media (min-width: 800px) {
    border-radius: 20px;
  }
  .re-posted {
    display: flex;
    height: fit-content;
    padding: 10px;
    background-color: #191919;
    @media (min-width: 800px) {
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
    }
    p {
      margin: 0;
      padding-left: 15px;
      font-size: 18px;
      color: white;
    }
  }

  .post-infos {
    display: flex;
    justify-content: space-between;
    background-color: #272330;
    width: 100%;
    @media (min-width: 800px) {
      border-radius: 20px;
    }
    span {
      color: tomato;
    }
    .side-bar {
      padding: 10px;
      width: 20%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        border-radius: 30px;
        margin-left: 5px;
        margin-bottom: 10px;
        @media (min-width: 800px) {
          width: 60px;
          height: 60px;
        }
      }
      .comment-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .like-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      p {
        margin: 0;
        margin: 10px 0px;
        padding-bottom: 10px;
        color: white;
        @media (min-width: 800px) {
          font-size: 18px;
        }
        @media (min-width: 1300px) {
          font-size: 20px;
        }
      }
    }
    .container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 80%;
      height: fit-content;
      padding: 10px;
      textarea:disabled {
        background-color: #fff !important;
      }
      form {
        width: 95%;
      }
      textarea {
        width: 100%;
        border-radius: 20px;
        margin-left: 5px;
        padding: 10px;
      }
      a {
        text-decoration: none;
        width: 100%;
        margin-top: 10px;
      }
      strong {
        font-size: 20px;
        font-family: "Afacad", sans-serif;
        font-style: italic;
        color: #ffffff;
      }
      p {
        margin: 0;
        margin-bottom: 10px;
        color: #c6c6c6;
      }
      .post-top {
        display: flex;
        width: 95%;
        .trash {
          padding-left: 10px;
        }
        .pencil {
          padding-left: 60%;
        }
      }
      .description {
        max-height: 50px;
        overflow-y: scroll;
      }
      .metadatas {
        height: 100px;
        width: 100%;
        display: flex;
        flex-direction: column;
        border: 1px solid #617c80;
        border-radius: 20px;
        padding: 10px;
        overflow-y: scroll;
      }
      img {
        width: 97%;
        margin: 2px 5px;
        height: 40%;
        border-radius: 30px;
      }
    }
  }
`;

const DivComments = styled.div`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  display: ${({ displayComments }) => (displayComments ? "flex" : "none")};
  flex-direction: column;
  justify-content: flex-start;
  background-color: #544f5e;
  small {
    color: #95b0b5;
    font-size: 17px;
    margin-left: 10px;
  }

  img {
    width: 45px;
    height: 45px;
    border-radius: 30px;
    margin-left: 5px;
    margin: 5px;
  }
  .comment-infos {
    display: flex;
    border-bottom: 1px solid #ffffff;
    .comment-text {
      p {
        margin: 0;
        color: white;
        padding-top: 5px;
        padding-left: 20px;
      }
      strong {
        font-size: 18px;
        font-family: "Afacad", sans-serif;
        font-weight: 400;
        filter: none;
      }
    }
  }
  .no-comments {
    padding: 10px;
    padding-left: 20%;
    margin: 0;
    color: white;
  }
  .comment-post {
    display: flex;
    align-items: center;
    width: 100%;
    form {
      display: flex;
      padding-top: 5px;
      padding-left: 20px;
      width: 80%;
      textarea {
        background-color: #7a7485;
        height: 40px;
        width: 90%;
        color: white;
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
      }
      button {
        background-color: #7a7485;
        height: 40px;
        width: 40px;
        border: none;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
      }
    }
  }
`;
