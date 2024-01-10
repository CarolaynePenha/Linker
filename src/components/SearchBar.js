import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";

import TokenContext from "../context/TokenContext";

export default function SearchBar({ updatePosts, setUpdatePosts }) {
  const [srcBar, setSrcBar] = useState("");
  const [names, setnames] = useState();
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function search() {
      const URL = process.env.REACT_APP_API_URL + `/srcBar?src=${srcBar}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.get(URL, config);
        setnames(data);
      } catch (err) {
        console.log(err.response);
        alert("Houve um erro na realizar sua busca!");
      }
    }
    search();
  }, [srcBar]);

  function userPage(id) {
    setSrcBar("");
    navigate(`/user/${id}`);
    setUpdatePosts(!updatePosts);
  }

  return (
    <ConteinerSrcBar srcBar={srcBar}>
      <DebounceInput
        minLength={3}
        debounceTimeout={500}
        placeholder={"Pesquise por pessoas"}
        onChange={(event) => setSrcBar(event.target.value)}
      />
      {names && srcBar && (
        <div className="src-box">
          {names.map((name) => {
            return (
              <div onClick={() => userPage(name.id)} className="src-results">
                <img src={name.image} />
                {name.following ? (
                  <p>
                    {name.name}
                    <small>
                      <FaCheck size={12} color="#95B0B5" /> seguindo
                    </small>
                  </p>
                ) : (
                  <p>{name.name}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </ConteinerSrcBar>
  );
}

const ConteinerSrcBar = styled.div`
  position: absolute;
  z-index: 3;
  top: 10vh;
  left: 5%;
  width: 90%;
  input {
    width: 100%;
    height: 45px;
    border-radius: ${(props) => (props.srcBar ? "0px" : "10px")};
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border: none;
  }
  .src-box {
    background-color: #ced0d6;
    width: 100%;
    height: fit-content;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    .src-results {
      display: flex;
      p {
        margin: 10px;
        margin-top: 17px;
        color: #272330;
        small {
          color: #95b0b5;
          font-size: 17px;
          margin-left: 10px;
        }
        filter: none;
        font-weight: 500;
      }
      img {
        width: 35px;
        height: 35px;
        border-radius: 30px;
        margin: 10px;
        margin-right: 0px;
      }
    }
  }
  @media (min-width: 800px) {
    top: 2vh;
    left: 20%;
    width: 50%;
    input {
      height: 50px;
      font-size: 16px;
    }
  }
  @media (min-width: 1300px) {
    input {
      height: 55px;
      font-size: 20px;
    }
    .src-box {
      .src-results {
        p {
          font-size: 22px;
        }
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
`;
