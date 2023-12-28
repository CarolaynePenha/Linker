import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";

import TokenContext from "../context/TokenContext";
import axios from "axios";

export default function SearchBar() {
  const [srcBar, setSrcBar] = useState("");
  const [names, setnames] = useState();
  const { token } = useContext(TokenContext);

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
        console.log("data: ", data);
        setnames(data);
      } catch (err) {
        console.log(err.response);
        alert("Houve um erro na realizar sua busca!");
      }
    }
    search();
  }, [srcBar]);
  console.log("names: ", names);

  return (
    <ConteinerSrcBar>
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
              <div className="src-results">
                <img src={name.image} />
                <p>{name.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </ConteinerSrcBar>
  );
}

const ConteinerSrcBar = styled.div`
  position: fixed;
  z-index: 3;
  top: 10vh;
  width: 90%;
  input {
    width: 100%;
    height: 40px;
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
        margin-top: 15px;
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
`;
