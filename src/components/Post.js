import { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { LuPencilLine } from "react-icons/lu";
import { Tooltip } from "react-tooltip";

import TokenContext from "../context/TokenContext";
import DeletePost from "./DeletePost";
import LikePost from "./LikePost";

export default function Post({ post, updatePosts, setUpdatePosts, loading }) {
  const inputElement = useRef();
  const [editable, setEditable] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [description, setDescriptiont] = useState(post.description);
  const { token } = useContext(TokenContext);

  const focusInput = () => {
    inputElement.current.focus();
  };

  useEffect(() => {
    if (editable) {
      focusInput();
    }
  }, [editable]);

  useEffect(() => {
    if (!loading) {
      setEditable(false);
      setDescriptiont("");
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

  return (
    <Article>
      <Tooltip id="my-tooltip" />
      <div className="side-bar">
        <img src={post.image} alt="imagem do usuário" />
        <LikePost post={post} updatePosts={updatePosts} loading={loading} />
      </div>
      <div className="container">
        <div className="post-top">
          <p>
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
              onChange={(e) => setDescriptiont(e.target.value)}
            />
          </form>
        ) : (
          <p className="description">{post.description}</p>
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
    </Article>
  );
}

// ---------------------------css
const Article = styled.article`
  display: flex;
  justify-content: space-between;
  background-color: #272330;
  width: 100%;
  margin-bottom: 20px;
  .side-bar {
    padding: 10px;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 30px;
      margin-left: 5px;
      margin-bottom: 10px;
    }
    p {
      margin: 0;
      margin-top: 10px;
      color: white;
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
      border-radius: 30px;
      margin-left: 5px;
    }
    a {
      text-decoration: none;
      width: 100%;
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
`;
