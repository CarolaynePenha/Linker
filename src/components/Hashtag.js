import styled from "styled-components";
import Header from "./Header";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { HttpStatusCode } from "axios";

import TokenContext from "../context/TokenContext";
import UserContext from "../context/UserContext";
import { logOut } from "../utils";
import Post from "./Post";
import LoadingRing from "./LoadingRing";

export default function Hashtag() {
  const { token, setToken } = useContext(TokenContext);
  const [loading, setLoading] = useState();
  const [posts, setPosts] = useState(false);
  const { hashtag } = useParams();
  const [updatePosts, setUpdatePosts] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    if (token) {
      async function getPosts() {
        setLoading(true);
        const URL = process.env.REACT_APP_API_URL + `/hashtag/${hashtag}`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const { data } = await axios.get(URL, config);
          setLoading(false);
          setPosts(data);
        } catch (err) {
          console.log(err.response);
          if (err.response.status === HttpStatusCode.NotFound) {
            return alert("hashtag não encontrada");
          }
          navigate("/");
        }
      }
      getPosts();
    } else {
      logOut(setToken, setUser, navigate);
    }
  }, [token, updatePosts]);
  return (
    <>
      <Header updatePosts={updatePosts} setUpdatePosts={setUpdatePosts} />
      <DivHashtagPage>
        <div className="top-user-posts">
          <img src={posts[0]?.image} alt="imagem do usuário" />
          <p>
            <strong># {hashtag} </strong>
          </p>
        </div>
        {posts[0] &&
          posts.map((post, index) => {
            return (
              <Post
                key={index}
                post={post}
                updatePosts={updatePosts}
                setUpdatePosts={setUpdatePosts}
                loading={loading}
              />
            );
          })}
        {posts?.length === 0 && <p>Não há nenhum post ainda.</p>}
        {!posts && (
          <DivCarregando>
            <p>
              <LoadingRing />
            </p>
          </DivCarregando>
        )}
      </DivHashtagPage>
    </>
  );
}
//  ----------------------------css
const DivHashtagPage = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  strong {
    font-family: "Abril Fatface", serif;
    font-size: 35px;
    color: white;
    filter: drop-shadow(1px 2px 1px #000000);
  }
  p {
    margin-left: 10px;
    margin-bottom: 15px;
  }
  .top-user-posts {
    margin-top: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      display: none;
      /* width: 50px;
          height: 50px;
          border-radius: 30px;
          margin-left: 5px;
          margin-right: 10px;
          margin-bottom: 10px; */
    }
  }
`;
const DivCarregando = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
