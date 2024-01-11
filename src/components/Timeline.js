import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState, useEffect } from "react";

import Header from "./Header";
import TokenContext from "../context/TokenContext";
import { logOut } from "../utils";
import UserContext from "../context/UserContext";

import Post from "./Post";
import Trending from "./Trending";
import LoadingRing from "./LoadingRing";

export default function Timeline() {
  const [buttonState, setButtonState] = useState(false);
  const [buttonLoading, setButtonLoading] = useState("Publicar");
  const [followers, setFollowers] = useState("Publicar");
  const { token, setToken } = useContext(TokenContext);
  const { setUser } = useContext(UserContext);
  const [posts, setPosts] = useState(false);
  const [infoPost, setInfoPost] = useState({
    url: "",
    description: "",
  });
  const navigate = useNavigate();
  const [updatePosts, setUpdatePosts] = useState(false);
  const [loading, setLoading] = useState();
  const [trendings, setTrendings] = useState(false);
  const { url, description } = infoPost;

  async function post(event) {
    event.preventDefault();
    setButtonState(true);
    setButtonLoading("Publicando...");
    const URL = process.env.REACT_APP_API_URL + "/timeline";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      if (infoPost.description?.length > 0) {
        await axios.post(URL, infoPost, config);
      } else {
        await axios.post(URL, { url }, config);
      }
      setButtonState(false);
      setButtonLoading("Publicar");
      setInfoPost({ url: "", description: "" });
      setUpdatePosts(!updatePosts);
    } catch (err) {
      console.log(err.response);
      setButtonState(false);
      setButtonLoading("Publicar");
      alert("Houve um erro ao publicar seu link!");
    }
  }

  useEffect(() => {
    if (token) {
      async function getHashtagsTrending() {
        const URL = process.env.REACT_APP_API_URL + "/trending";
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const { data } = await axios.get(URL, config);
          setTrendings(data);
        } catch (err) {
          console.log(err.response);
        }
      }
      async function getFollowers() {
        const URL = process.env.REACT_APP_API_URL + "/follow";
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const { data } = await axios.get(URL, config);
          setFollowers(data);
        } catch (err) {
          console.log(err.response);
        }
      }
      getFollowers();
      getHashtagsTrending();
    } else {
      logOut(setToken, setUser, navigate);
    }
  }, [token, updatePosts]);

  useEffect(() => {
    if (token) {
      async function getPosts() {
        setLoading(true);
        const URL = process.env.REACT_APP_API_URL + "/timeline";
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const response = await axios.get(URL, config);
          setPosts(response.data);
          setLoading(false);
        } catch (err) {
          console.log(err.response);
        }
      }
      getPosts();
    } else {
      logOut(setToken, setUser, navigate);
    }
  }, [token, updatePosts]);

  return (
    <DivConteiner>
      <Header updatePosts={updatePosts} setUpdatePosts={setUpdatePosts} />
      <DivTimeline>
        <p>
          <strong>Timeline</strong>
        </p>
        <section>
          <form onSubmit={post}>
            <p>O que você vai compartilhar hoje?</p>
            <input
              type="url"
              required
              disabled={buttonState}
              placeholder="http://..."
              value={url}
              onChange={(e) =>
                setInfoPost({ ...infoPost, url: e.target.value })
              }
            ></input>
            <textarea
              type="text"
              disabled={buttonState}
              placeholder="Cachorrinhos incrivelmente fofos #cachorrionhosfofos"
              value={description}
              onChange={(e) =>
                setInfoPost({ ...infoPost, description: e.target.value })
              }
            />

            <button
              disabled={buttonState}
              type="submit"
              className="save-button"
            >
              {buttonLoading}
            </button>
          </form>
        </section>
        {posts && typeof posts === "string" ? (
          posts === "Still don't follow anyone" ? (
            <DivNoPosts>
              <p>Você ainda não segue ninguém, procure por amigos.</p>
            </DivNoPosts>
          ) : (
            <DivNoPosts>
              <p>Nenhum post ,dos seus amigos, encontrado. </p>
            </DivNoPosts>
          )
        ) : posts?.length >= 1 && !loading ? (
          posts.map((post, index) => {
            return (
              <Post
                key={index}
                post={post}
                followers={followers}
                updatePosts={updatePosts}
                setUpdatePosts={setUpdatePosts}
                loading={loading}
              />
            );
          })
        ) : (
          !posts && (
            <DivNoPosts>
              <p>
                <LoadingRing />
              </p>
            </DivNoPosts>
          )
        )}
      </DivTimeline>
      <DivTrending>
        <p className="top-trending">
          <strong>Trending</strong>
        </p>
        {trendings[0] &&
          trendings.map((trending, index) => {
            return <Trending key={index} trending={trending} />;
          })}
        {trendings?.length === 0 && <p>Não há nenhuma hashtag ainda.</p>}
        {!trendings && <p>Carregando...</p>}
      </DivTrending>
    </DivConteiner>
  );
}
//  ----------------------------css
const DivTimeline = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  p {
    margin-top: 20vh;
    font-size: 16px;
  }
  strong {
    font-family: "Abril Fatface", serif;
    font-size: 35px;
    color: white;
    filter: drop-shadow(1px 2px 1px #000000);
  }
  section {
    width: 100%;
    position: relative;
    margin: 20px 0px;
    form {
      display: flex;
      flex-direction: column;
      background-color: white;
      height: 28vh;
      input {
        height: 30px;
        border: none;
        background-color: #efefef;
        margin: 10px 0px;
      }
      textarea {
        height: 60px;
        border: none;
        background-color: #efefef;
        margin: 10px 0px;
      }
      button {
        position: absolute;
        bottom: 5px;
        right: 10px;
        height: 30px;
        width: 80px;
        border-radius: 10px;
        border: none;
        background-color: #5f3e56;
        margin: 10px 0px;
        color: white;
      }
      p {
        font-size: 25px;
        padding: 15px 0px;
        margin-top: 0px;
        font-style: italic;
        color: #544f5e;
      }
    }
  }
  @media (min-width: 800px) {
    width: 50%;
    margin-left: 10%;
  }
  @media (min-width: 1300px) {
    width: 35%;
    margin-left: 15%;
  }
`;
const DivConteiner = styled.div`
  width: 100%;
  @media (min-width: 800px) {
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
`;
const DivTrending = styled.div`
  width: 25%;
  height: fit-content;
  background-color: #272330;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 15px;
  display: none;
  margin-top: 26vh;
  margin-left: 10px;
  .top-trending {
    margin-bottom: 10px;
  }
  p {
    font-size: 20px;
    font-weight: 400;
    color: white;
    padding-bottom: 5px;
    strong {
      font-family: "Abril Fatface", serif;
      text-decoration: underline;
      font-size: 24px;
      font-weight: 500;
    }
  }
  @media (min-width: 800px) {
    display: flex;
    flex-direction: column;
    top: 26vh;
    right: 3%;
    border-radius: 20px;
  }
  @media (min-width: 1300px) {
    display: flex;
    width: 22%;
    top: 26vh;
    right: 26%;
    border-radius: 20px;
  }
`;
const DivNoPosts = styled.div`
  height: 20vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
