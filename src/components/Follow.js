import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import TokenContext from "../context/TokenContext";

export default function Follow({ followers, id }) {
  const [following, setFollowing] = useState(false);
  const { token } = useContext(TokenContext);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setFollowing(followers);
  }, [followers]);

  async function followUser() {
    setDisabled(true);
    const URL = process.env.REACT_APP_API_URL + `/follow/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.post(URL, "", config);
      setFollowing(!following);
      setDisabled(false);
    } catch (err) {
      console.log(err.response);
      alert("Não foi possível realizar essa operação.");
      setDisabled(false);
    }
  }
  return (
    <DivFollow following={following}>
      {following && (
        <button disabled={disabled} onClick={followUser}>
          Unfollow
        </button>
      )}
      {!following && (
        <button disabled={disabled} onClick={followUser}>
          Follow
        </button>
      )}
    </DivFollow>
  );
}

// -----------------------------css
const DivFollow = styled.div`
  display: flex;
  width: 130px;

  button {
    width: 100%;
    height: 35px;
    border-radius: 10px;
    margin: 10px;
    font-weight: 600;
    background-color: ${(props) => (props.following ? "white" : "#2A928E")};
    color: ${(props) => (props.following ? "#2A928E" : "white")};
  }
`;
