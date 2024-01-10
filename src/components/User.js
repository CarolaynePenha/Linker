import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "./Header";
import { logOut } from "../utils";
import TokenContext from "../context/TokenContext";
import UserContext from "../context/UserContext";
import Post from "./Post";
import LoadingRing from "./LoadingRing";
import Follow from "./Follow";

export default function User() {
  const { token, setToken } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState(false);
  const navigate = useNavigate();
  const [updatePosts, setUpdatePosts] = useState(false);
  const [followers, setFollowers] = useState();

  const [loading, setLoading] = useState();
  const { id } = useParams();
  useEffect(() => {
    if (token) {
      async function getPosts() {
        setLoading(true);
        const URL = process.env.REACT_APP_API_URL + `/user/${id}`;
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
        }
      }
      async function getFollowers() {
        const URL = process.env.REACT_APP_API_URL + `/follow/${id}`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const { data } = await axios.get(URL, config);
          setFollowers(data.following);
        } catch (err) {
          console.log(err.response);
        }
      }
      getFollowers();
      getPosts();
    } else {
      logOut(setToken, setUser, navigate);
    }
  }, [token, updatePosts]);

  return (
    <>
      <Header updatePosts={updatePosts} setUpdatePosts={setUpdatePosts} />
      <DivUserPage>
        <div className="top-user-posts">
          <div className="user-infos">
            <img src={posts[0]?.image} alt="imagem do usuário" />

            {id == user.id ? (
              <p>
                <strong>Meus posts</strong>
              </p>
            ) : (
              <p>
                <strong>{posts[0]?.name} posts</strong>
              </p>
            )}
          </div>
          {id == user.id ? "" : <Follow followers={followers} id={id} />}
        </div>

        {posts?.length >= 1 &&
          !loading &&
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
      </DivUserPage>
    </>
  );
}
//  ----------------------------css
const DivUserPage = styled.div`
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
    width: 100%;
    margin-top: 20vh;
    display: flex;
    justify-content: space-between;

    .user-infos {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        display: none;
      }
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
