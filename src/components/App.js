import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TokenProvider } from "../context/TokenContext";
import { UserProvider } from "../context/UserContext";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Timeline from "./Timeline";
import User from "./User";
import Hashtag from "./Hashtag";

function App() {
  return (
    <DivApp>
      <UserProvider>
        <TokenProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/" element={<SignIn />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/user/:id" element={<User />} />
              <Route path="/hashtag/:hashtag" element={<Hashtag />} />
            </Routes>
          </BrowserRouter>
        </TokenProvider>
      </UserProvider>
    </DivApp>
  );
}

export default App;

// --------------------------------------------css
const DivApp = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
  min-height: 100vh;
  /* @media (min-width: 600px) {
    display: flex;
    justify-content: center;
  } */
  @media (min-width: 800px) {
    display: flex;
    justify-content: center;
  }
`;
