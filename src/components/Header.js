import styled from "styled-components";
import { useContext, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";
import TokenContext from "../context/TokenContext";

export default function Header() {
  const { token, setToken } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const {
    user: { image },
  } = useContext(UserContext);

  function logOut() {
    setToken(null);
    setUser("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <Conteiner>
      <p>
        <strong>Linker </strong>
      </p>
      <DivMenu
        onFocus={() => {
          console.log("blur");
        }}
      >
        {menuOpen ? (
          <>
            <div className="menuUp" onClick={() => setMenuOpen(!menuOpen)}>
              <IoIosArrowUp size={30} color="white" />
              <img src={image} alt="userImage" />
            </div>
            <div className="logout">
              <p onClick={() => logOut()}>Logout</p>
            </div>
          </>
        ) : (
          <div className="menuUp" onClick={() => setMenuOpen(!menuOpen)}>
            <IoIosArrowDown size={30} color="white" />
            <img src={image} alt="userImage" />
          </div>
        )}
      </DivMenu>
    </Conteiner>
  );
}

// -------------------css

const Conteiner = styled.div`
  position: relative;
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #272330;
  padding: 0 15px;
  p {
    max-width: 90%;
    margin-bottom: 10px;
    font-size: 20px;
    color: white;
    filter: drop-shadow(1px 2px 1px #000000);
  }
  strong {
    font-size: 30px;
    font-family: "Abril Fatface", serif;
  }
`;
const DivMenu = styled.menu`
  position: fixed;
  top: 2%;
  right: 0px;
  width: 28%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #272330;
  border-bottom-left-radius: 40px;
  .menuUp {
    padding-bottom: 15px;
    padding-right: 10px;
  }
  .logout {
    padding-right: 10px;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 30px;
    margin-left: 5px;
  }
`;
