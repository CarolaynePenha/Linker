import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";

import Header from "./Header";
import TokenContext from "../context/TokenContext";

export default function Timeline() {
  const [buttonState, setButtonState] = useState(false);
  const [buttonLoading, setButtonLoading] = useState("Publicar");
  const { token } = useContext(TokenContext);
  const [infoPost, setInfoPost] = useState({
    url: "",
    description: "",
  });
  const navigate = useNavigate();
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
      if (infoPost.description.length > 0) {
        const response = await axios.post(URL, infoPost, config);
      } else {
        const response = await axios.post(URL, { url }, config);
      }

      setButtonState(false);
      setButtonLoading("Publicar");
      setInfoPost({ url: "", description: "" });
    } catch (err) {
      console.log(err.response);
      setButtonState(false);
      setButtonLoading("Publicar");
      alert("Houve um erro ao publicar seu link!");
    }
  }

  return (
    <>
      <Header />
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
        <article>
          <div className="side-bar">img</div>
        </article>
      </DivTimeline>
    </>
  );
}
//  ----------------------------css
const DivTimeline = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  strong {
    font-family: "Abril Fatface", serif;
    font-size: 35px;
    color: white;
    filter: drop-shadow(1px 2px 1px #000000);
  }
  section {
    width: 100%;
    position: relative;
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
        font-style: italic;
        color: #544f5e;
      }
    }
  }
`;
